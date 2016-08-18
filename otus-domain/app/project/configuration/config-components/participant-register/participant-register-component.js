(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .component('otusParticipantRegister', {
            templateUrl: 'app/project/configuration/config-components/participant-register/participant-register-template.html',

            controller: Controller

        });

    Controller.$inject = [
        '$q',
        'otusjs.otus-domain.project.ProjectConfigurationService',
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

        function updateFields() {
            self.changed = false;
            self.data = ProjectConfigurationService.fetchParticipantRegisterConfiguration();
            if (self.data != {}) {  //TODO check this test accordingly to rest return
                self.sendingDate = new Date(self.data.sendingDate);
                self.sendingDate = self.sendingDate.toLocaleDateString() + ' - ' + self.sendingDate.toLocaleTimeString();
            }
        }

        function uploadFile(file) {
            self.changed = true;
            fileParser(file).then(function(templateObject) {
                self.data.file = templateObject;
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
            updateRest().then(function(response) {
                $mdToast.show($mdToast.simple().textContent('Salvo com sucesso'));
                updateFields();
            });
        }

        function updateRest() {
            var deferred = $q.defer();
            deferred.resolve(ProjectConfigurationService.updateParticipantRegisterConfiguration(mainFile));
            deferred.reject(); //TODO   implementar quando chamadas rest estiverem prontas
            return deferred.promise;
        }

    }

}());
