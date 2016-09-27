describe('project praticipant register setter', function() {
    var Mock = {};
    var $componentController,
        $injector,
        $mdToast,
        $q,
        ctrl,
        $scope;

    beforeEach(function() {
        module('otusDomain');
    });
    beforeEach(function() {
        module('otusDomain.project.configuration');

        module(function($provide) {
            $provide.service('defaultAlertFactoryA', myServiceName);
        });

        inject(function(_$componentController_, _$injector_, _$q_, _$rootScope_, _$mdToast_) {
            $mdToast = _$mdToast_;
            $scope = _$rootScope_.$new();
            $q = _$q_;
            $injector = _$injector_;
            $componentController = _$componentController_;
            deferred = $q.defer();
            mockProjectConfigurationService($injector);
            ctrl = $componentController('otusParticipantRegister', {
                $scope: $scope
            });
        });
    });

    xdescribe('some uploads', function() {
        it('should do nothing when a wrong file format is given', function() {
            Mock.ProjectConfigurationService.fetchParticipantRegisterConfiguration = {};
            ctrl.uploadConfig.callback({
                type: 'notJson'
            });
            expect(ctrl.data).toEqual({});
        });
    });

    describe('an init w a few files given by the backend', function() {
        Mock.ProjectConfigurationService.fetchParticipantRegisterConfiguration = {};
        it('should feed self.templatesList with the given files info', function() {
            Mock.ProjectConfigurationService.fetchParticipantRegisterConfiguration = [{
                'name': 'Integração',
                'acronym': 'INT',
                'templateType': ''
            }, {
                'name': 'Profile',
                'acronym': 'PRF',
                'templateType': 'profile'
            }, {
                'name': 'Elegibilidade',
                'acronym': 'ELEA',
                'templateType': ''
            }];

            expect(self.templatesList).toEqual(Mock.ProjectConfigurationService.fetchParticipantRegisterConfiguration);
        });

    });



    function mockProjectConfigurationService($injector) {
        Mock.ProjectConfigurationService = $injector.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService');
        return Mock.ProjectConfigurationService;
    }

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.configuration.UploadToolService');
        return Mock.UploadToolService;
    }
});
