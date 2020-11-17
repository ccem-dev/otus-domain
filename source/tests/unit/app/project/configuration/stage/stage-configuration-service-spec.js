describe('StageConfigurationService_UnitTest_Suite', () => {
    let service;
    let Injections = [];
    let Mock = {};

    beforeEach(() => {
        angular.mock.module('otusDomain.dashboard', 'otusDomain.rest', 'otus.client');
        angular.mock.inject(($injector, $q, $rootScope) => {
            Injections.StageFactory = $injector.get('otusDomain.dashboard.StageFactory');
            Injections.StageRestService = $injector.get('StageRestService');
            service = $injector.get('otusDomain.dashboard.StageConfigurationService', Injections);
            mockInitialize($q, $rootScope);

            spyOn(Injections.StageRestService, 'getAll').and.returnValue(Mock.deferredStages.promise);
            spyOn(Injections.StageRestService, 'create').and.returnValue(Mock.deferredCreate.promise);
            spyOn(Injections.StageRestService, 'update').and.returnValue(Mock.deferredConfirmation.promise);
            spyOn(Injections.StageRestService, 'remove').and.returnValue(Mock.deferredConfirmation.promise);
            spyOn(Injections.StageRestService, 'getById').and.returnValue(Mock.deferredById.promise);
        });
    });

    function mockInitialize($q, $rootScope) {
        Mock.stageJsons = {data: Test.utils.data.stageJsons};
        Mock.createSucessReturn = {"data": "5f806dd70fdacb62ed85f9db"};
        Mock.confirmationSucessReturn = {"data": true};
        Mock.deferredStages = $q.defer();
        Mock.deferredStages.resolve(Mock.stageJsons);
        Mock.deferredCreate = $q.defer();
        Mock.deferredCreate.resolve(Mock.createSucessReturn);
        Mock.deferredConfirmation = $q.defer();
        Mock.deferredConfirmation.resolve(Mock.confirmationSucessReturn);
        Mock.scope = $rootScope.$new();
        Mock.primitiveJson = {_id: "123456789", name: "Onda 1"};
        Mock.stage = service.parseStage(Mock.primitiveJson);
        Mock.deferredById = $q.defer();
        Mock.deferredById.resolve({"data": Mock.stage});
    }

    it('serviceExistence_check', () => {
        expect(service).toBeDefined();
    });

    it('serviceMethodsExistence_check', () => {
        expect(service.loadStages).toBeDefined();
        expect(service.createStage).toBeDefined();
        expect(service.updateStage).toBeDefined();
        expect(service.removeStage).toBeDefined();
        expect(service.getStageById).toBeDefined();
        expect(service.parseStage).toBeDefined();
    });

    it('loadStages method should return list with 3 itens of stages', () => {
        let stages = service.loadStages();
        Mock.scope.$digest();
        stages.then(value => expect(value.length).toBe(4))
        Mock.scope.$digest();
    });

    it('parseStage method should generate an instance of the stage class ', () => {
        expect(service.parseStage(Mock.primitiveJson).objectType).toBe('Stage');
    });

    it('createStage method should return id if api can persist stage', () => {
        Mock.scope.$digest();
        service.createStage(Mock.primitiveJson).then(response =>
            expect(response.data).toBe(Mock.createSucessReturn.data))
        Mock.scope.$digest();
    });

    it('removeStage method should confirmation in case of successful delete', () => {
        Mock.scope.$digest();
        service.removeStage(Mock.stage.getId()).then(response => expect(response.data).toBeTruthy)
        Mock.scope.$digest();
    });


    it('updateStage method should return confirmation in case of successful update', () => {
        Mock.scope.$digest();
        service.updateStage(Mock.stage).then(response => expect(response.data).toBeTruthy)
        Mock.scope.$digest();
    });

    it('getStageById method should return stage if there is a requested id', () => {
        Mock.scope.$digest();
        service.getStageById(Mock.stage.getId()).then(response => expect(response.data.objectType).toBe("Stage"))
        Mock.scope.$digest();
    });
});
