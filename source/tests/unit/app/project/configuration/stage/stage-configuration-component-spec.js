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
            Injections.$mdDialog = $injector.get('$mdDialog');
            Injections.StageValues = $injector.get('otusDomain.dashboard.StageValues');
            Injections.StageConfigurationService = $injector.get('otusDomain.dashboard.StageConfigurationService');
            ctrl = $controller('stageController', Injections);
            mockInitialize($q, $rootScope);

            spyOn(Injections.StageConfigurationService, 'loadStages').and.returnValue(Mock.deferredStages.promise);
            spyOn(Injections.StageConfigurationService, 'createStage').and.returnValue(Mock.deferredCreate.promise);
            spyOn(Injections.$mdDialog, 'show').and.callFake(() => { return { then: (callBack) => callBack(true) }});
            spyOn(Injections.$mdToast, 'show');
        });
    });

    function mockInitialize($q, $rootScope) {
        Mock.stageJsons = Test.utils.data.stageJsons;
        Mock.createSucessReturn = {"data": "5f806dd70fdacb62ed85f9db"};
        Mock.confirmationSucessReturn = {"data": { "STATUS": "OK" }};

        Mock.deferredStages = $q.defer();
        Mock.deferredStages.resolve(Mock.stageJsons);
        Mock.deferredCreate = $q.defer();
        Mock.deferredCreate.resolve(Mock.createSucessReturn);
        Mock.deferredConfirmation = $q.defer();
        Mock.deferredConfirmation.resolve(Mock.confirmationSucessReturn);
        Mock.scope = $rootScope.$new();

        Mock.primitiveJson = {name: "Onda 1"};
        Mock.stageJsonWithId = {_id: "123456789", name: "Onda 1.1"};
        Mock.stage = Injections.StageConfigurationService.parseStage(Mock.stageJsonWithId);
    }

    it('ctrlExistence_check', () => {
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

    it('onInit method should initialize artefacts', () => {
        expect(ctrl.stages.length).toBe(0)
        ctrl.$onInit();
        Mock.scope.$digest();
        expect(ctrl.isEditStage).toBeFalsy();
        expect(ctrl.stages.length).toBe(4)
    });

    it('loadStages method should return list with 3 itens of stages', () => {
        expect(ctrl.stages.length).toBe(0)
        ctrl.loadStages();
        Mock.scope.$digest();
        expect(ctrl.stages.length).toBe(4);
    });

    it('addStage method should enable edit mode', () => {
        expect(ctrl.isEditStage).toBeFalsy();
        ctrl.addStage();
        expect(ctrl.isEditStage).toBeTruthy();
    });

    it('editStage method should enable editing mode and popular variable', () => {
        expect(ctrl.stage).toEqual({});
        expect(ctrl.isEditStage).toBeFalsy();
        ctrl.editStage(Mock.stage);
        expect(ctrl.stage).toEqual(Mock.stage);
        expect(ctrl.isEditStage).toBeTruthy();
    });

    it('saveStage should direct to the stageCreationService', () => {
        ctrl.stage = Mock.primitiveJson;
        ctrl.stageForm = {$invalid: false}
        ctrl.saveStage(ctrl.stage);
        Mock.scope.$digest();
        expect(Injections.StageConfigurationService.createStage).toHaveBeenCalledTimes(1);
    });
});
