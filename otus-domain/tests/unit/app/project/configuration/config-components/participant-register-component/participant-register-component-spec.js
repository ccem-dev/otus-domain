describe('project praticipant register setter', function() {
    var Mock = {};
    var $componentController,
        $injector,
        $mdToast,
        $q,
        ctrl,
        $scope;

    beforeEach(function() {
        module('otusDomain.project.configuration');

        inject(function(_$componentController_, _$injector_, _$q_, _$rootScope_, _$mdToast_) {
            $mdToast = _$mdToast_;
            $scope = _$rootScope_.$new();
            $q = _$q_;
            $componentController = _$componentController_;
            $injector = _$injector_;
            deferred = $q.defer(); //_$q_.defer();
            mockUploadToolService($injector);
            ctrl = $componentController('otusParticipantRegister', {
                $scope: $scope
            });
        });
    });

    it('should set set empty fields when rest return equals to null', function() {
        Mock.UploadToolService.fetchParticipantRegisterConfiguration = {};
        expect(ctrl.data).toEqual({});
    });

    it('should do nothing when a wrong file format is given', function() {
        Mock.UploadToolService.fetchParticipantRegisterConfiguration = {};
        ctrl.uploadConfig.callback({
            type: 'notJson'
        });
        expect(ctrl.data).toEqual({});
    });

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.configuration.UploadToolService');
        return Mock.UploadToolService;
    }
});
