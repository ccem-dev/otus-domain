describe('Outcome Configuration Component Tests', function () {

    var ctrl;
    var rest, scope, service, dialog;
    var Mock = {};
    var Injections = {};
    const CONTROLLER_NAME = 'outcomeController';
    Mock.LoadingScreenService = {};
    Mock.objectOutcome = {label: 'Outcome'};
    Mock.OutcomeFactory = {
        create: () => {
            return {label: 'Outcome'}
        },
        fromJson: () => {
            return {label: 'Outcome'}
        }
    };

    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('otusjs.model.outcome.OutcomeFactory', Mock.OutcomeFactory);
        $provide.value('otusDomain.LoadingScreenService', Mock.LoadingScreenService);
        $provide.value('OtusRestResourceService', {
            getOutcomeResourceFactory: function () { return {} },
        });
    }));

    beforeEach(function () {
        angular.mock.module('otusDomain.rest');
        angular.mock.module('otusDomain.dashboard');
        angular.mock.module('ngMaterial');
        angular.mock.inject((_$controller_, _$mdDialog_, _OutcomeRestService_, $injector, _$rootScope_, _$mdToast_, _$q_, _$compile_) => {
            scope = _$rootScope_.$new();
            dialog = _$mdDialog_;
            service = $injector.get('otusDomain.dashboard.outcome.OutcomeConfigurationService');

            Injections = {
                "$mdToast": _$mdToast_,
                "$scope": scope,
                "$mdDialog": dialog,
                "OutcomeConfigurationService": service
            };
            rest = _OutcomeRestService_;
            ctrl = _$controller_(CONTROLLER_NAME, Injections);
        });

        spyOn(rest, 'create').and.returnValue(Promise.resolve());
        spyOn(rest, 'list').and.returnValue(Promise.resolve());
        spyOn(rest, 'update').and.returnValue(Promise.resolve());
        spyOn(service, 'loadConfiguration').and.returnValue(Promise.resolve([]));
        spyOn(service, 'updateConfiguration').and.returnValue(Promise.resolve([]));
        spyOn(service, 'initialize').and.returnValue({});
        spyOn(service, 'saveConfiguration').and.returnValue(Promise.resolve(true));
        spyOn(Injections.$mdDialog, 'show').and.returnValue(Promise.resolve());
        spyOn(Injections.$mdToast, 'show').and.returnValue(Promise.resolve());
    });

    it('should create ctrl', function () {
        expect(ctrl).toBeDefined();
        expect(ctrl.isNewFollowUp).toBeTruthy();
        expect(ctrl.selectedFollowUp).toBeDefined();
        expect(ctrl.selectedFollowUp).toBeNull();
        expect(ctrl.typeEvent).toBeDefined();
        expect(ctrl.typeEvent).toBeNull();
        expect(ctrl.init).toBeDefined();
        expect(ctrl.saveOutcome).toBeDefined();
        expect(ctrl.action).toBeDefined();
        expect(ctrl.editFollowUp).toBeDefined();
        expect(ctrl.removeFollowUp).toBeDefined();
        expect(ctrl.createFollowUp).toBeDefined();
        expect(ctrl.addEvent).toBeDefined();
        expect(ctrl.select).toBeDefined();
        expect(ctrl.cancel).toBeDefined();
        expect(ctrl.saveConfiguration).toBeDefined();
        expect(ctrl.saveEvent).toBeDefined();
        expect(ctrl.cancelEvent).toBeDefined();
        expect(ctrl.$onInit).toBeDefined();
        expect(ctrl.isCreating).toBeFalsy();
        expect(ctrl.isEditFollowUp).toBeFalsy();
        expect(ctrl.outcome).toBeDefined();
        expect(ctrl.outcome).toBeNull();
        expect(ctrl.events).toBeDefined();
        expect(ctrl.events.length).toEqual(1);
    });

    it('should init component', function () {
        ctrl.$onInit();
        expect(service.loadConfiguration).toHaveBeenCalledTimes(1);
    });

    it('should init object', function () {
        ctrl.init();
        expect(service.initialize).toHaveBeenCalledTimes(1);
    });

    it('should save configuration', function () {
        ctrl.editFollowUp(1);
        ctrl.saveConfiguration();
        expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1);
    });

    it('should save outcome object', function () {
        spyOn(service, 'load');
        ctrl.saveOutcome();
        expect(service.load).toHaveBeenCalledTimes(1);
        expect(service.saveConfiguration).toHaveBeenCalledTimes(1);
    });

});
