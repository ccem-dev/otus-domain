(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .component('otusParticipantRegister', {
            templateUrl: 'app/project/configuration/config-components/participant-register/participant-register-template.html',

            controller: function($element, ProjectConfigurationService) {
                var self = this;
                _init();

                /* Public Interface*/
                self.uploadConfig = {
                    'callback': uploadGetter,
                    'type': 'json'
                };

                function _init() {
                  console.log($element);
                    self.data = ProjectConfigurationService.fetchConfig();
                }

                function uploadGetter(file) {
                    console.log(file);
                }

            }
        });
}());
