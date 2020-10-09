describe('StageFactory_UnitTest_Suite', () => {
    let factory;
    let Injections = [];
    let Mock = {};

    beforeEach(() => {
        angular.mock.module('otusDomain.dashboard');
        angular.mock.inject($injector => {
            //Injections. = $injector.get(' ');
            factory = $injector.get('otusDomain.dashboard.StageFactory', Injections);
            mockInitialize();



        });
    });

    function mockInitialize(){
        Mock.primitiveJson = {_id: "123456789", name: "Onda 1"};
        Mock.stageJson = '{"_id":"123456789","objectType":"Stage","name":"Onda 1"}'

    }

    it('factoryExistence_check', () => {
        expect(factory).toBeDefined();
    });

    it('factoryMethodsExistence_check', () => {
        expect(factory.create).toBeDefined();
    });

    it('create method should instantiate stageClass', () => {
        Mock.stage = factory.create(Mock.primitiveJson);
        expect(Mock.stage.getId()).toBe(Mock.primitiveJson._id);
        expect(Mock.stage.getName()).toBe(Mock.primitiveJson.name);
    });

    it('toJSON method should stringify of instanceof Stage ', () => {
        Mock.stage = factory.create(Mock.primitiveJson);
        expect(JSON.stringify(Mock.stage.toJSON())).toBe(Mock.stageJson);
    });
});
