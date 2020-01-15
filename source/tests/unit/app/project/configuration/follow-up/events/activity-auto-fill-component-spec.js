describe('Activity Auto Fill Component Tests', function () {

    var ctrl;
    var rest, scope, service, dialog;
    var Mock = {};
    var Bindings = {};
    var Injections = {};
    const CONTROLLER_NAME = 'autoFillCtrl';
    Mock.LoadingScreenService = {
        start: () => {},
        finish: () => {}
    };
    Mock.objectOutcome = {label: 'Outcome'};
    Mock.ActivityAutoFillEventFactory = {
        create: () => {
            return {label: 'Outcome'}
        },
        fromJson: () => {
            return {label: 'Outcome'}
        }
    };

    Mock.ProjectConfigurationService = {
        getSurveysManagerConfiguration: function() {
            return Promise.resolve([]);
        },
        deleteSurveyTemplate: function() {
            return Promise.resolve();
        },
        updateSurveyTemplateType: function() {
            return Promise.resolve();
        },
        publishTemplate: function() {
            return Promise.resolve(Mock.surveyList[0]);
        },
        getCollectionOfPermissions: function() {
            return Promise.resolve();
        }
    };

    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('otusDomain.LoadingScreenService', Mock.LoadingScreenService);
        $provide.value('otusDomain.rest.configuration.ProjectConfigurationService', Mock.ProjectConfigurationService);
        $provide.value('otusjs.model.outcome.ActivityAutoFillEventFactory', Mock.ActivityAutoFillEventFactory);
        $provide.value('OtusRestResourceService', {
            getOutcomeResourceFactory: function () { return {} },
        });
    }));

    beforeEach(function () {
        Bindings.save = () => {};
        Bindings.cancel = () => {};
        angular.mock.module('otusDomain.dashboard');
        angular.mock.module('ngMaterial');
        angular.mock.inject((_$controller_) => {
            ctrl = _$controller_(CONTROLLER_NAME);
        });

    });

    it('should create ctrl', function () {
        expect(ctrl).toBeDefined();
        expect(ctrl.preEvent).toBeDefined();
        expect(ctrl.typeEvent).toBeDefined();
        expect(ctrl.select).toBeDefined();
    });

    it('should onInit called', function () {
        spyOn(Mock.ActivityAutoFillEventFactory, 'create').and.callThrough();
        spyOn(Mock.ProjectConfigurationService, 'getSurveysManagerConfiguration').and.callThrough();
        spyOn(Mock.LoadingScreenService, 'start').and.callThrough();
        spyOn(Mock.LoadingScreenService, 'finish').and.callThrough();
        ctrl.$onInit();
        expect(ctrl.data).toBeDefined();
        expect(Mock.ActivityAutoFillEventFactory.create).toHaveBeenCalledTimes(1);
        expect(Mock.ProjectConfigurationService.getSurveysManagerConfiguration).toHaveBeenCalledTimes(1);
        expect(Mock.LoadingScreenService.start).toHaveBeenCalledTimes(1);
        Mock.ProjectConfigurationService.getSurveysManagerConfiguration().then(function () {
            expect(Mock.LoadingScreenService.finish).toHaveBeenCalledTimes(1);
        });

    });

    it('should select activity', function () {
        ctrl.selectedSurvey = {
            acronym: 'TST',
            name: 'TESTE'
        };
        ctrl.$onInit();
        ctrl.select();
        expect(ctrl.data.acronym).toEqual(ctrl.selectedSurvey.acronym);
        expect(ctrl.data.name).toEqual(ctrl.selectedSurvey.name);
    });

});
