describe('StageRestService_UnitTest_Suite', () => {
    let service;
    let Injections = [];
    let Mock = {};

    beforeEach(() => {
        angular.mock.module('otusDomain.rest', 'otus.client');
        angular.mock.inject($injector => {
            Injections.OtusRestResourceService = $injector.get('OtusRestResourceService');
            service = $injector.get('StageRestService', Injections);
            mockInitialize();


        });
    });

    function mockInitialize() {
        Mock.stageJson = {_id: '123456', objectType: 'Stage', name: "Onda 1"};
        Mock._rest = {
            create: () => { return { $promise: Promise.resolve() }}
        }
    }

    it('serviceExistence_check', () => {
        expect(service).toBeDefined();
    });

    it('serviceMethodsExistence_check', () => {
        expect(service.initialize).toBeDefined();
        expect(service.create).toBeDefined();
        expect(service.update).toBeDefined();
        expect(service.remove).toBeDefined();
        expect(service.getAll).toBeDefined();
        expect(service.getById).toBeDefined();
    });

    it('initialize method should evoke getStageResourceFactory by OtusRestResourceService', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory');
        service.initialize();
        expect(Injections.OtusRestResourceService.getStageResourceFactory).toHaveBeenCalledTimes(1);
    });


    it('create method should return promise', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory').and.returnValue(Mock._rest);
        service.initialize();
        expect(service.create(Mock.stageJson)).toBePromise();
    });

    xit('should ', () => {
    });
    xit('should ', () => {
    });
    xit('should ', () => {
    });
});
