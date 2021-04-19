(function () {
    'use strict';

    angular
        .module('otusDomain.rest')
        .service('ProjectHttpService', Service);

    Service.$inject = [
        '$q',
        '$http',
        'DashboardStateService'
    ];

    function Service($q, $http, DashboardStateService) {
        var self = this;
        var _http = null;


        /* Public methods */
        self.initialize = initialize;
        self.getProjects = getProjects;
        self.installerReady = installerReady;

        function initialize() {
            const defer = $q.defer();
            $http.get('./volumes/project.json')
                .then(res =>{
                    if(res.status == 404) {
                        defer.reject('error');
                        return _httpError()
                    }
                    _http = res;
                    defer.resolve(res)
                });
            return defer.promise;
        }

        function getProjects() {
            _httpError()
            return new Promise((resolve, reject) => {
                resolve(_http.data.projects)
            })
        }

        function installerReady() {
            _httpError()
            return new Promise((resolve, reject) => {
                resolve(_http.data.installer.ready)
            })
        }

        function _httpError(){
            if (!_http) {
                return DashboardStateService.goToErrorMissingProject()
            }
        }

    }
}());
