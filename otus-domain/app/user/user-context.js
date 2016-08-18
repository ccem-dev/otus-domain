(function() {
    'use strict';

    angular
        .module('otusDomain.user')
        .service('user.UserContext', service);

    service.$inject = ['RestResourceService'];

    function service(RestResourceService) {
        var self = this;

        self.currentUser = null;
        self.setCurrentUser = setCurrentUser;
        self.getCurrentUser = getCurrentUser;
        self.reloadCurrentUser = reloadCurrentUser;

        function setCurrentUser(currentUser) {
            self.currentUser = currentUser;
        }

        function getCurrentUser() {
            return self.currentUser;
        }

        function reloadCurrentUser() {
            if (RestResourceService.isLogged()) {
                var userResource = RestResourceService.getUserResource();

                userResource.current(function(response) {
                    self.currentUser = response.data;
                });
            }
        }
    }

}());
