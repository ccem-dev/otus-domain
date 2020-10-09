describe('StageConfigurationComponent_UnitTest_Suite', () => {
    let ctrl;
    let Injections = [];
    let Mock = {
        LoadingScreenService: {
            start: jasmine.createSpy(),
            finish: jasmine.createSpy()
        }
    };

    beforeEach(() => {
        angular.mock.module('otusDomain.dashboard', 'ngMaterial', 'otusDomain.rest', 'otus.client', ($provide) => {
            $provide.value('otusDomain.LoadingScreenService', Mock.LoadingScreenService)
        });
        angular.mock.inject(($injector, $controller, $q, $rootScope) => {
            Injections.$mdToast = $injector.get('$mdToast');
            Injections.StageValues = $injector.get('otusDomain.dashboard.StageValues');
            Injections.StageConfigurationService = $injector.get('otusDomain.dashboard.StageConfigurationService');
            ctrl = $controller('stageController', Injections);
            mockInitialize($q, $rootScope);


            spyOn(Injections.StageConfigurationService, 'loadStages').and.returnValue(Mock.deferredStages.promise);

        });
    });

    function mockInitialize($q, $rootScope) {
        Mock.stageJsons = Test.utils.data.stageJsons;
        // Mock.createSucessReturn = {"data": "5f806dd70fdacb62ed85f9db"};
        // Mock.confirmationSucessReturn = {"data": true};

        Mock.deferredStages = $q.defer();
        Mock.deferredStages.resolve(Mock.stageJsons);
        // Mock.deferredCreate = $q.defer();
        // Mock.deferredCreate.resolve(Mock.createSucessReturn);
        // Mock.deferredConfirmation = $q.defer();
        // Mock.deferredConfirmation.resolve(Mock.confirmationSucessReturn);
        Mock.scope = $rootScope.$new();

        // Mock.primitiveJson = {_id: "123456789", name: "Onda 1"};
        // Mock.stage = service.parseStage(Mock.primitiveJson);
        // Mock.deferredById = $q.defer();
        // Mock.deferredById.resolve({"data": Mock.stage});

    }

    it('ctrlExistence_check', () => {
        console.log(ctrl)
        expect(ctrl).toBeDefined();
    });

    it('ctrlMethodsExistence_check', () => {
        expect(ctrl.loadStages).toBeDefined();
        expect(ctrl.addStage).toBeDefined();
        expect(ctrl.editStage).toBeDefined();
        expect(ctrl.saveStage).toBeDefined();
        expect(ctrl.removeStage).toBeDefined();
        expect(ctrl.reload).toBeDefined();
    });

    it('loadStages method should return list with 3 itens of stages', () => {
        ctrl.loadStages();
        Mock.scope.$digest();
        expect(ctrl.stages.length).toBe(3);
    });

    it('addStage method should enable edit mode', () => {
        expect(ctrl.isEditStage).toBeFalsy();
        ctrl.addStage();
        expect(ctrl.isEditStage).toBeTruthy();
    });

    
    xit('should ', () => {
    });
    xit('should ', () => {
    });
    xit('should ', () => {
    });
    xit('should ', () => {
    });
    xit('should ', () => {
    });
    xit('should ', () => {
    });
    xit('should ', () => {
    });
});
