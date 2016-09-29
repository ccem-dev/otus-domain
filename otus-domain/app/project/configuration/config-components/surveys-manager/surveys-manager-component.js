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
        self.save = save;
        self.updateSurveyType = updateSurveyType;

        self.uploadConfig = {
            'callback': uploadFile,
            'type': 'json'
        };

        self.editions = {
            'post': {},
            'update': {}
        };
        self.uploaded = function() {
            return angular.equals(self.editions.post, {});
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
                        self.editions.post = templateObject;                        
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

        function save() {
            ProjectConfigurationService.updateSurveysManagerConfiguration(self.editions, successfullCallback, failureCallback);
            _resetEdition();
        }

        function updateSurveyType(survey) {
            if (survey.surveyFormType === 'PROFILE') {
                survey.surveyFormType = 'FORM_INTERVIEW';
            } else {
                survey.surveyFormType = 'PROFILE';
            }
            self.editions.update = survey;
            console.log(self.editions);
        }

        function _resetEdition() {
            self.editions = {
                'post': {},
                'update': {}
            };
        }

        function successfullCallback(uploadedSurveyTemplate) {
            _getTemplatesList();
            $mdToast.show($mdToast.simple().textContent('Formulário enviado!'));
        }

        function failureCallback() {
            $mdToast.show($mdToast.simple().textContent('Falha ao salvar formulário'));
        }
    }

}());
