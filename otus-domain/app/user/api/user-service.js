(function() {
    'use strict';

    angular
        .module('otusDomain.user')
        .service('user.UserService', service);

    service.$inject = ['user.UserContext'];

    function service(UserContext) {
        var self = this;
        self.getCurrentUser = getCurrentUser;
        self.reloadCurrentUser = reloadCurrentUser;
        self.setCurrentUser = setCurrentUser;

        function setCurrentUser(currentUser){
            UserContext.setCurrentUser(currentUser);
        }

        function getCurrentUser() {
            return UserContext.getCurrentUser();
        }

        function reloadCurrentUser() {
            UserContext.reloadCurrentUser();
        }
    }

}());
