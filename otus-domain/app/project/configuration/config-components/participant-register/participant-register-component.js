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
            self.data = ProjectConfigurationService.fetchParticipantRegisterConfiguration();
            updateFields(self.data);
        }

        function updateFields(data) {
            self.changed = false;
            if (!!self.data.file) { //TODO check this test accordingly to rest return
                self.data.sendingDate = getDate(new Date(data.sendingDate));
            }
        }

        function uploadFile(file) {
            self.changed = true;
            if(file.type==='application/json'){
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
            updateRest().then(function(uploadSet) {
                $mdToast.show($mdToast.simple().textContent('Salvo com sucesso'));
                updateFields(uploadSet);
            });
        }

        function updateRest() {
            var deferred = $q.defer();
            var uploadSet = {
                'file': self.data.file,
                'sendingDate': new Date()
            };
            deferred.resolve(ProjectConfigurationService.updateParticipantRegisterConfiguration(uploadSet));
            return deferred.promise;
        }

        function getDate(date){
          return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
        }
    }

}());
