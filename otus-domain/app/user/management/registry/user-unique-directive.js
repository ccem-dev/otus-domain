(function() {
    angular
        .module('user.management')
        .directive(
            'unique', ['$http', '$q', 'RestResourceService',
                function($http, $q, RestResourceService) {
                    return {
                        restrict: 'A',
                        require: 'ngModel',
                        link: function(scope, element, attrs, ctrl) {
                            ctrl.$asyncValidators.emailInUse = function(modelValue) {
                                var deferred = $q.defer();
                                var userRestResource = RestResourceService.getUserResource();

                                userRestResource.exist({
                                    'email': modelValue
                                }, function(response) {
                                    if (response.data) {
                                        deferred.reject();
                                    } else {
                                        deferred.resolve();
                                    }
                                });

                                return deferred.promise;
                            };
                        }
                    };
                }
            ]);
})();
