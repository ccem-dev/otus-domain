describe('Outcome Configuration Service Tests', function () {

    var service;
    var rest;
    var Mock = {};
    var Injections = {};
    const SERVICE_NAME = 'otusDomain.dashboard.outcome.OutcomeConfigurationService';
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
        $provide.value('OtusRestResourceService', {
            getOutcomeResourceFactory: function () { return {} },
        });
    }));

    beforeEach(function () {
        angular.mock.module('otusDomain.dashboard');
        angular.mock.module('otusDomain.rest');
        angular.mock.inject(($injector, _OutcomeRestService_) => {
            service = $injector.get(SERVICE_NAME);
            rest = _OutcomeRestService_;
        });

        spyOn(rest, 'create').and.returnValue(Promise.resolve());
        spyOn(rest, 'list').and.returnValue(Promise.resolve());
        spyOn(rest, 'update').and.returnValue(Promise.resolve());
    });

    it('should create service', function () {
        expect(service).toBeDefined();
        expect(service.initialize).toBeDefined();
        expect(service.load).toBeDefined();
        expect(service.loadConfiguration).toBeDefined();
        expect(service.saveConfiguration).toBeDefined();
        expect(service.updateConfiguration).toBeDefined();
    });

    it('should initialize an object outcome', function () {
        expect(service.initialize()).toEqual(Mock.objectOutcome);
        expect(service.initialize()).not.toEqual({});
    });

    it('should load an object outcome', function () {
        expect(service.load({})).toEqual(Mock.objectOutcome);
        expect(service.load({})).not.toEqual({});
    });

    it('should load configuration of outcome', function () {
        service.loadConfiguration();
        expect(rest.list).toHaveBeenCalledTimes(1);
    });

    it('should save configuration of outcome', function () {
        service.saveConfiguration();
        expect(rest.create).toHaveBeenCalledTimes(1);
    });

    it('should update configuration of outcome', function () {
        service.updateConfiguration();
        expect(rest.update).toHaveBeenCalledTimes(1);
    });
});
