xdescribe('project praticipant register', function() {
    var Mock = {};
    var $componentController,
        $injector,
        $mdToast,
        $q,
        ctrl,
        $scope,
        $rootScope;

    beforeEach(module('otusDomain'));
    beforeEach(inject(function(_$componentController_, _$q_, _$rootScope_, _$mdToast_, _$injector_) {
        $componentController = _$componentController_;
        $mdToast = _$mdToast_;
        $q = _$q_;
        $rootScope = _$rootScope_;

        var Bindings = {
            $scope: $rootScope
        };
        $injector = _$injector_;
        var Injections = {
            '$q': $q,
            'ProjectConfigurationService': mockProjectConfigurationService($injector),
            '$mdToast': $mdToast
        };

        ctrl = $componentController('otusSurveysManager', Injections, Bindings);
    }));

    xit('should feed self.templatesList with the given files info', function() {
        spyOn(Mock.ProjectConfigurationService, 'fetchSurveysManagerConfiguration');
        Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration = function() {
            return [{
                'sender': "brenoscheffer@gmail.com",
                'sendingDate': "Oct 6, 2016 10:56:46 PM",
                'surveyFormType': "FORM_INTERVIEW",
                'surveyTemplate': {
                    'identity': {
                        'name': 'Toda vez que eu viajava pela estrada de ouro fino',
                        'acronym': 'ZEZE'
                    }
                }
          }, {
                'sender': "brenoscheffer@gmail.com",
                'sendingDate': "Oct 6, 2016 10:56:46 PM",
                'surveyFormType': "PROFILE",
                'surveyTemplate': {
                    'identity': {
                        'name': 'Elegibilidade',
                        'acronym': 'ELEA'
                    }
                }
          }, {
                'sender': "brenoscheffer@gmail.com",
                'sendingDate': "Oct 6, 2016 10:56:46 PM",
                'surveyFormType': "FORM_INTERVIEW",
                'surveyTemplate': {
                    'identity': {
                        'name': 'INT',
                        'acronym': 'Integração'
                    }
                }
          }];
        };
        ctrl.$onInit();
        expect(Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration).toHaveBeenCalled();
    });


    xdescribe('some uploads', function() {
        it('should do nothing when a wrong file format is given', function() {
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration = {};
            ctrl.uploadConfig.callback({
                type: 'notJson'
            });
            expect(ctrl.data).toEqual({});
        });
    });


    function mockProjectConfigurationService($injector) {
        Mock.ProjectConfigurationService = $injector.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService', {
            // 'OtusRestResourceService': $injector.get('OtusRestResourceService')
        });
        return Mock.ProjectConfigurationService;
    }

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.configuration.UploadToolService');
        return Mock.UploadToolService;
    }
});
