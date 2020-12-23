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
            $http.get('./volumes/project.json')
                .then(res =>{
                    if(res.status == 404) {
                        return _httpError()
                    }
                    _http = res;
                });
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
