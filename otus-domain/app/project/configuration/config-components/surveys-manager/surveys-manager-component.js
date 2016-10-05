(function() {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .component('otusSurveysManager', {
            templateUrl: 'app/project/configuration/config-components/surveys-manager/surveys-manager-template.html',
            controller: Controller
        });

    Controller.$inject = [
        '$q',
        'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
        '$mdToast'
    ];

    function Controller($q, ProjectConfigurationService, $mdToast) {
        var self = this;

        this.$onInit = function() {
            _getTemplatesList();
        };

        /* Public Interface*/
        self.publishTemplate = publishTemplate;
        self.updateSurveyFormType = updateSurveyFormType;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.uploadConfig = {
            'callback': uploadFile,
            'type': 'json'
        };

        self.uploadedFile = {};
        self.uploaded = function() {
            return (angular.equals(self.uploadedFile, {}) ? true : false);
        };

        function _getTemplatesList() {
            var promise = ProjectConfigurationService.fetchSurveysManagerConfiguration();
            promise.then(function(data) {
                console.log(data);
                self.surveyTemplatesList = data;
            });
        }

        function uploadFile(fileList) {
            fileList.forEach(function(file) {
                if (fileList[0].name.split('.')[1] === 'json') {
                    fileParser(file).then(function(templateObject) {
                        self.uploadedFile = templateObject;
                    });
                }
            });
        }

        function fileParser(file) {
            var deferred = $q.defer();
            var reader = new FileReader();
            reader.onload = function() {
                deferred.resolve(JSON.parse(reader.result));
            };
            reader.readAsText(file);
            return deferred.promise;
        }

        function publishTemplate() {
            ProjectConfigurationService.publishTemplate(self.uploadedFile, successfullUploadCallback, failurePublishCallback)
                .then(function() {
                    successfullUploadCallback();
                })
                .catch(function(error) {
                  console.log(error);
                    failurePublishCallback(error);
                });
        }

        function deleteSurveyTemplate(index) {
            ProjectConfigurationService.deleteSurveyTemplate(self.surveyTemplatesList[index].surveyTemplate.identity.acronym)
                .then(function() {
                    self.surveyTemplatesList.splice(index, 1);
                    $mdToast.show($mdToast.simple().textContent('Excluído'));
                })
                .catch(function() {
                    $mdToast.show($mdToast.simple().textContent('Erro ao excluir'));
                });
        }

        function updateSurveyFormType(index) {
            var selectedAcronym = self.surveyTemplatesList[index].surveyTemplate.identity.acronym;
            var newType = self.surveyTemplatesList[index].surveyFormType;
            ProjectConfigurationService.updateSurveyTemplateType({
                'acronym': selectedAcronym,
                'type': newType
            }, failurePublishCallback)
            .then(function() {
              $mdToast.show($mdToast.simple().textContent('Alterado com sucesso'));

            })
            .catch(function() {
              $mdToast.show($mdToast.simple().textContent('Erro ao alterar'));

            });
        }

        function successfullUploadCallback() {
            self.uploadedFile = {};
            _getTemplatesList();
            $mdToast.show($mdToast.simple().textContent('Upload realizado com sucesso'));
        }

        function failurePublishCallback(error) {
            var errorMessage = '';
            switch (error) {
                case 'UNIQUE_ACRONYM':
                    errorMessage += 'Já existe um formulário com esta sigla';
                    $mdToast.show($mdToast.simple().textContent(errorMessage));
                    break;
                case 'UNIQUE_ID':
                    errorMessage += 'Ids de questões dos formulários devem ser únicos';
                    $mdToast.show($mdToast.simple().textContent(errorMessage));
                    break;
                default:

            }
        }
    }

}());
