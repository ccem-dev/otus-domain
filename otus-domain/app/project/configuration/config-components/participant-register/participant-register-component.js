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
        var mainFile;

        function _init() {
            updateFields();
        }

        function updateFields(data) {
            self.data = ProjectConfigurationService.fetchParticipantRegisterConfiguration();
            self.changed = false;
            if (!!self.data.file) { //TODO check this test accordingly to rest return
                self.data.sendingDate = getDate(new Date(data.sendingDate));
            }
        }

        function uploadFile(file) {
            self.changed = true;
            if (file.type === 'application/json') {
                fileParser(file).then(function(templateObject) {
                    self.data.file = templateObject;
                    self.data.sendingDate = '';
                });
            }
        }
        //application/json

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
            var uploadSet = {
                'file': self.data.file,
                'sendingDate': new Date()
            };
            ProjectConfigurationService.updateParticipantRegisterConfiguration(uploadSet, successfull, failure);
        }

        function successfull() {
            self.changed = false;
            self.data.sendingDate = getDate(new Date());
            $mdToast.show($mdToast.simple().textContent('Salvo com sucesso'));
        }

        function failure() {
            $mdToast.show($mdToast.simple().textContent('Falha ao salvar formulário'));
            updateFields();
        }

        function getDate(date) {
            return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
        }
    }

}());
