(function() {
    'use strict'

    angular
        .module('otusDomain.project')
        .component('otusParticipantRegister', {
            templateUrl: 'app/project/configuration/config-components/participant-register/participant-register-template.html',

            controller: function(ProjectConfigurationService) {
                var self = this;
                _init();

                function _init() {
                    self.data = ProjectConfigurationService.fetchConfig();
                }
            }
        })
}());
