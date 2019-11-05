describe('UserActivationController', function() {

    var Mock = {};
    var controller;

    beforeEach(function() {
        angular.mock.module('otusDomain');

        inject(function(_$controller_, _$injector_, $http, $scope, $filter, $mdDialog, $mdToast) {
            controller = _$controller_('UserActivationController', {
                $scope: mockScope($rootScope),
                'ResourceService': mockRestResourceService(_$injector_),
                'RestResourceService': mockOtusRestResourceService(_$injector_)
            });
        });
    });

    describe("Match controller", function() {

        xit("should be created successfully", function() {
            expect(true).toBe(true);
        });
    });

    function mockRestResourceService() {
        Mock.RestResourceService = $injector.get('RestResourceService');
        return Mock.RestResourceService;
    }

    function mockOtusRestResourceService() {
        Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');
        return Mock.OtusRestResourceService;
    }

    function mockScope($rootScope) {
        Mock.$scope = $rootScope.$new();
        return Mock.$scope;
    }

    function mockHttp($rootScope) {
        Mock.$scope = $rootScope.$new();
        return Mock.$scope;
    }

});
