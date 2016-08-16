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
            self.changed = false;
            self.data = ProjectConfigurationService.fetchParticipantRegisterConfiguration();
            self.sendingDate = new Date(self.data.sendingDate);
            self.sendingDate = self.sendingDate.toLocaleDateString() + ' - ' + self.sendingDate.toLocaleTimeString();
        }

        function uploadFile(file) {
            self.changed = true;
            fileParser(file).then(function(templateObject) {
                mainFile = templateObject;
                self.data.file = mainFile;
                self.sendingDate = new Date();
                self.sendingDate = self.sendingDate.toLocaleDateString() + ' - ' + self.sendingDate.toLocaleTimeString();
                //email update
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
            self.changed = false;
            ProjectConfigurationService.updateParticipantRegisterConfiguration(mainFile);
            Object.assign(self.data.file, mainFile);
            $mdToast.show($mdToast.simple().textContent('Salvo com sucesso'));
        }

        function updateRest(){
          var deferred = $q.defer();
          deferred.resolve();
          deferred.reject(); //TODO   implementar quando chamadas rest estiverem prontas
          return deferred.promise;
        }

    }

}());
