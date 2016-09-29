(function() {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .component('otusParticipantRegister', {
            templateUrl: 'app/project/configuration/config-components/participant-register/participant-register-template.html',

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
            _init();
        };

        /* Public Interface*/
        self.save = save;
        self.uploadConfig = {
            'callback': uploadFile,
            'type': 'json'
        };
        self.uploadedTemplates = [];

        var editions = {
          'post':[],
          'update':{'row':[]}
        };

        function _init() {
            self.surveyTemplatesList = [];
            _getTemplatesList();
        }

        function _getTemplatesList() {
            var promise = ProjectConfigurationService.fetchParticipantRegisterConfiguration();
            promise.then(function(data) {
                self.surveyTemplatesList = data;
            });

        }

        function uploadFile(fileList) {
            fileList.forEach(function(file) {
                if (fileList[0].name.split('.')[1] === 'json') {
                    fileParser(file).then(function(templateObject) {
                        self.uploadedTemplates.push(templateObject);
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
            ProjectConfigurationService.updateParticipantRegisterConfiguration(self.uploadedTemplates, successfullCallback, failureCallback);
            self.uploadedTemplates = [];
        }

        function successfullCallback(surveyTemplatesList) {
        //   console.log(surveyTemplatesList);
            // self.surveyTemplatesList = surveyTemplatesList;
            $mdToast.show($mdToast.simple().textContent('Formulário enviado!'));
            _init();
        }

        function failureCallback() {
            $mdToast.show($mdToast.simple().textContent('Falha ao salvar formulário'));
        }
    }

}());
