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
        self.uploadTemplate = uploadTemplate;
        self.updateSurveyFormType = updateSurveyFormType;

        self.uploadConfig = {
            'callback': uploadFile,
            'type': 'json'
        };

        self.uploadedFile = {};
        self.uploaded = function() {
            return (angular.equals(self.uploadedFile, {}) ? true : false);
        };
        self.changeCheck = function() {
            console.log('arr');
            return self.surveyTemplatesList;
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

        function uploadTemplate() {
            ProjectConfigurationService.updateSurveysManagerConfiguration(self.uploadedFile, successfullCallback, failureCallback);
        }


        function updateSurveyFormType(index) {
            var types = ['PROFILE', 'FORM_INTERVIEW'];
            if (self.surveyTemplatesList[index].surveyFormType === 'PROFILE') {
              self.surveyTemplatesList[index].surveyFormType = 'FORM_INTERVIEW';
            }
            else{
              self.surveyTemplatesList[index].surveyFormType = 'PROFILE';
            }
            console.log(self.surveyTemplatesList);

        }

        function successfullCallback(uploadedSurveyTemplate) {
            self.uploadedFile = {};
            _getTemplatesList();
            $mdToast.show($mdToast.simple().textContent('Formulário enviado!'));
        }

        function failureCallback() {
            $mdToast.show($mdToast.simple().textContent('Falha ao salvar formulário'));
        }
    }

}());
