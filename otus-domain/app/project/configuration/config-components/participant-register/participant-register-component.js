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
        _init();

        /* Public Interface*/
        self.save = save;
        self.uploadConfig = {
            'callback': uploadFile,
            'type': 'json'
        };
        self.uploadedTemplates = [];
        // self.templatesList = [];

        var mainFile;

        function _init() {
            _getTemplatesList();
        }

        function _getTemplatesList() {
            self.templatesList = ProjectConfigurationService.fetchParticipantRegisterConfiguration();
        }

        function uploadFile(fileList) {
            fileList.forEach(function(file) {
                if (file.type === 'application/json') {
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

        function successfullCallback(templatesList) {
          console.log(templatesList);
            self.templatesList = templatesList;
        }

        function failureCallback() {
            $mdToast.show($mdToast.simple().textContent('Falha ao salvar formulário'));
        }

        function getDate(date) {
            return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
        }
    }

}());
