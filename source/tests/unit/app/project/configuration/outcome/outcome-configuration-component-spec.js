describe('Outcome Configuration Component Tests', function () {

    var ctrl;
    var rest, scope;
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
        angular.mock.inject((_$controller_, _OutcomeRestService_, $injector, _$rootScope_, _$mdToast_, _$q_, _$compile_) => {
            scope = _$rootScope_.$new();
            Injections = {
                "$mdToast": _$mdToast_,
                "$scope": scope,
            };
            rest = _OutcomeRestService_;
            ctrl = _$controller_(CONTROLLER_NAME, Injections);
        });

        spyOn(rest, 'create').and.returnValue(Promise.resolve());
        spyOn(rest, 'list').and.returnValue(Promise.resolve());
        spyOn(rest, 'update').and.returnValue(Promise.resolve());
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

    describe('onInit method', function(){});
    describe('init method', function(){});
    describe('saveConfiguration method', function(){});
    describe('saveEvent method', function(){});
    describe('cancelEvent method', function(){});
    describe('saveOutcome method', function(){});
    describe('action method', function(){});
    describe('editFollowUp method', function(){});
    describe('removeFollowUp method', function(){});
    describe('createFollowUp method', function(){});
    describe('addEvent method', function(){});
    describe('cancel method', function(){});
});
