describe('UserActivationController', function() {

    var Mock = {};
    var controller;

    beforeEach(function() {
        module('otus');

        mockUserData();

        inject(function(_$controller_, _$injector_, $rootScope) {
            controller = _$controller_('SignupController', {
                $scope: mockScope($rootScope),
                SignupService: mockRestResourceService(_$injector_),
                SignupService: mockOtusRestResourceService(_$injector_)
            });
        });
    });

    describe('init', function() {
        it('method should to assign RestResourceService in clientSelected', function() {

        });
    });

    function mockScope($rootScope) {
        Mock.$scope = $rootScope.$new();
        

        return Mock.$scope;
    }

});
