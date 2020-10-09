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

            spyOn(Injections.StageRestService, 'getAll').and.returnValue(Mock.deferred.promise);
        });
    });

    function mockInitialize($q, $rootScope){
        Mock.stageJsons = { data: Test.utils.data.stageJsons };
        Mock.deferred = $q.defer();
        Mock.deferred.resolve(Mock.stageJsons);
        Mock.scope = $rootScope.$new();
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
        stages.then(value => expect(value.length).toBe(3))
        Mock.scope.$digest();
    });

    xit('should ', () => { });
    xit('should ', () => { });
    xit('should ', () => { });
    xit('should ', () => { });
    xit('should ', () => { });
    xit('should ', () => { });
});
