xdescribe('project visual identity component', function() {
    var Mock = {};
    var $componentController,
        $injector,
        $mdToast,
        $q,
        ctrl,
        notFound,
        $scope;

    beforeEach(function() {
        angular.mock.module('otusDomain.project.configuration');

        inject(function(_$componentController_, _$injector_, _$q_, _$rootScope_, _$mdToast_) {
            $mdToast = _$mdToast_;
            $scope = _$rootScope_.$new();
            $q = _$q_;
            $componentController = _$componentController_;
            $injector = _$injector_;
            deferred = $q.defer(); //_$q_.defer();
            mockUploadToolService($injector);

            notFound = 'app/assets/img/image_not_found.jpg';
            ctrl = $componentController('otusVisualIdentity', {
                $scope: $scope
            });
        });
    });

    it('should set -not found- image when rest return equals to null', function() {

        Mock.UploadToolService.fetchProjectsVisualIdentity = {};
        deferred.resolve(Mock.UploadToolService.fetchProjectsVisualIdentity);
        $scope.$apply();
        expect(ctrl.data.files.logoURL).toEqual(notFound);
        expect(ctrl.data.files.bannerURL).toEqual(notFound);
    });

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.configuration.UploadToolService');
        return Mock.UploadToolService;
    }
});
