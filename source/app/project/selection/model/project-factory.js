(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .factory('ProjectFactory', factory);

    factory.$inject = ['UserService'];

    function factory(UserService) {
        var self = this;
        self.create = create;

        function create(name, url, accessToken) {
            UserService.getLoggedUser()
                .then(user => {
                    return new Project(name, url, user.email, accessToken);
                });
        }

        return self;
    }

    function Project(name, url, user, accessToken) {
        var self = this;
        var authentication = new ProjectAuthentication(user, accessToken);
        self.name = name;
        self.url = url;
        self.status = false;
        self.getAuthentication = getAuthentication;
        self.online = online;
        self.offline = offline;
        self.changeStatus = changeStatus;

        function getAuthentication() {
            return authentication;
        }

        function online() {
            self.status = true;
        }

        function offline() {
            self.status = false;
        }

        function changeStatus(boolean) {
            self.status = boolean;
        }
    }

    function ProjectAuthentication(user, accessToken) {
        var self = this;
        self.user = user;
        self.accessToken = accessToken;
    }

}());
