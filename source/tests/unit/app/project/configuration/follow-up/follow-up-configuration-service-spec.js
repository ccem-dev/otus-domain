describe('FollowUp Configuration Service Tests', function () {

    var service;
    var restFollowUp;
    var restEvent;
    var Mock = {};
    var Injections = {};
    const SERVICE_NAME = 'otusDomain.dashboard.FollowUpConfigurationService';
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
        $provide.value('OtusRestResourceService', {
            getFollowUpResourceFactory: function () { return {} },
            getEventResourceFactory: function () { return {} }
        });
    }));

    beforeEach(function () {
        angular.mock.module('otusDomain.dashboard');
        angular.mock.module('otusDomain.rest');
        angular.mock.inject(($injector, _FollowUpRestService_, _EventRestService_) => {
            service = $injector.get(SERVICE_NAME);
            restFollowUp = _FollowUpRestService_;
            restEvent = _EventRestService_;
        });

        spyOn(restFollowUp, 'add').and.returnValue(Promise.resolve());
        spyOn(restFollowUp, 'deactivate').and.returnValue(Promise.resolve());
        spyOn(restFollowUp, 'list').and.returnValue(Promise.resolve());
        spyOn(restFollowUp, 'update').and.returnValue(Promise.resolve());
        spyOn(restEvent, 'create').and.returnValue(Promise.resolve());
        spyOn(restEvent, 'deactivate').and.returnValue(Promise.resolve());
    });

    it('should create service', function () {
        expect(service).toBeDefined();
        expect(service.addFollowUp).toBeDefined();
        expect(service.updateFollowUp).toBeDefined();
        expect(service.deactivateFollowUp).toBeDefined();
        expect(service.addEvent).toBeDefined();
        expect(service.deactivateEvent).toBeDefined();
    });

    it('should load configuration', function () {
        service.loadConfiguration();
        expect(restFollowUp.list).toHaveBeenCalledTimes(1);
    });

    it('should save FollowUp of outcome', function () {
        service.addFollowUp();
        expect(restFollowUp.add).toHaveBeenCalledTimes(1);
    });

    it('should update FollowUp', function () {
        service.updateFollowUp();
        expect(restFollowUp.update).toHaveBeenCalledTimes(1);
    });

    it('should save Event', function () {
        service.addEvent();
        expect(restEvent.create).toHaveBeenCalledTimes(1);
    });

    it('should deactivate Event ', function () {
        service.deactivateEvent();
        expect(restEvent.deactivate).toHaveBeenCalledTimes(1);
    });
});
