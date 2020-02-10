describe('FollowUp Configuration Component Tests', function () {

    var ctrl;
    var rest, scope, service, dialog;
    var Mock = {};
    var Injections = {};
    const CONTROLLER_NAME = 'followUpController';
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
        $provide.value('otusjs.model.outcome.FollowUpFactory', {create: () => {}});
        $provide.value('otusDomain.LoadingScreenService', Mock.LoadingScreenService);
        $provide.value('OtusRestResourceService', {
            getOutcomeResourceFactory: function () { return {} },
        });
    }));

    beforeEach(function () {
        angular.mock.module('otusDomain.rest');
        angular.mock.module('otusDomain.dashboard');
        angular.mock.module('ngMaterial');
        angular.mock.inject((_$controller_, _$mdDialog_, _FollowUpRestService_, $injector, _$rootScope_, _$mdToast_, _$q_, _$compile_) => {
            scope = _$rootScope_.$new();
            dialog = _$mdDialog_;
            service = $injector.get('otusDomain.dashboard.FollowUpConfigurationService');

            Injections = {
                "$mdToast": _$mdToast_,
                "$scope": scope,
                "$mdDialog": dialog,
                "OutcomeConfigurationService": service
            };
            rest = _FollowUpRestService_;
            ctrl = _$controller_(CONTROLLER_NAME, Injections);
        });

        spyOn(rest, 'add').and.returnValue(Promise.resolve());
        spyOn(rest, 'list').and.returnValue(Promise.resolve());
        spyOn(rest, 'update').and.returnValue(Promise.resolve());
        spyOn(service, 'loadConfiguration').and.returnValue(Promise.resolve([]));
        spyOn(service, 'updateFollowUp').and.returnValue(Promise.resolve([]));
        spyOn(service, 'addFollowUp').and.returnValue(Promise.resolve(true));
        spyOn(Injections.$mdDialog, 'show').and.returnValue(Promise.resolve());
        spyOn(Injections.$mdToast, 'show').and.returnValue(Promise.resolve());
    });

    it('should create ctrl', function () {
        expect(ctrl).toBeDefined();
        expect(ctrl.selectedFollowUp).toBeDefined();
        expect(ctrl.selectedFollowUp).toBeNull();
        expect(ctrl.typeEvent).toBeDefined();
        expect(ctrl.typeEvent).toBeNull();
        expect(ctrl.action).toBeDefined();
        expect(ctrl.editFollowUp).toBeDefined();
        expect(ctrl.removeFollowUp).toBeDefined();
        expect(ctrl.addEvent).toBeDefined();
        expect(ctrl.cancel).toBeDefined();
        expect(ctrl.saveEvent).toBeDefined();
        expect(ctrl.cancelEvent).toBeDefined();
        expect(ctrl.$onInit).toBeDefined();
        expect(ctrl.isCreating).toBeTruthy();
        expect(ctrl.isEditFollowUp).toBeFalsy();
        expect(ctrl.events).toBeDefined();
        expect(ctrl.events.length).toEqual(1);
    });

    it('should init component', function () {
        ctrl.$onInit();
        expect(service.loadConfiguration).toHaveBeenCalledTimes(1);
    });

    it('should init object', function () {
        ctrl.$onInit();
        expect(service.loadConfiguration).toHaveBeenCalledTimes(1);
    });

});
