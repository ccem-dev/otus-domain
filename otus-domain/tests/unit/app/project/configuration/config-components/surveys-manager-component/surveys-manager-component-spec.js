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

        inject(function(_$componentController_, _$injector_, _$q_, _$rootScope_, _$mdToast_) {
            $mdToast = _$mdToast_;
            $scope = _$rootScope_.$new();
            $q = _$q_;
            $injector = _$injector_;
            deferred = $q.defer();
            var Injections = {
                '$q': $q,
                'ProjectConfigurationService': mockProjectConfigurationService($injector),
                '$mdToast': $mdToast
            };
            var Bindings = {
                $scope: $scope
            };
            $componentController = _$componentController_;
            ctrl = $componentController('otusParticipantRegister', Injections, Bindings);
        });
    });

    it('should feed self.templatesList with the given files info', function() {
        Mock.ProjectConfigurationService.fetchParticipantRegisterConfiguration = function() {
            return [{
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
        };
        var result = angular.equals(ctrl.templatesList, Mock.ProjectConfigurationService.fetchParticipantRegisterConfiguration());
        console.log(ctrl.templatesList);
        expect(result).toBe(true);
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


    function mockProjectConfigurationService($injector) {
        Mock.ProjectConfigurationService = $injector.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService');
        return Mock.ProjectConfigurationService;
    }

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.configuration.UploadToolService');
        return Mock.UploadToolService;
    }
});
