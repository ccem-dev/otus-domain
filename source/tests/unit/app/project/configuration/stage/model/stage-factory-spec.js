describe('StageFactory_UnitTest_Suite', () => {
    let factory;
    let Injections = [];
    let Mock = {};

    beforeEach(() => {
        angular.mock.module('otusDomain.dashboard');
        angular.mock.inject($injector => {
            factory = $injector.get('otusDomain.dashboard.StageFactory', Injections);
            mockInitialize();
        });
    });

    function mockInitialize() {
        Mock.primitiveJson = {_id: "123456789", name: "Onda 1", surveyAcronyms:["TCLE"]};
        Mock.stageJson = '{"_id":"123456789","objectType":"Stage","name":"Onda 1","surveyAcronyms":["TCLE"]}'
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

    it('updateSurveyAcronyms method should add the acronym in the array', () => {
       Mock.stage = factory.create(Mock.primitiveJson);
       Mock.stage.updateSurveyAcronyms('CURC');
       expect(Mock.stage.surveyAcronyms.includes('CURC')).toBeTruthy();
    });

    it('updateSurveyAcronyms method should remove the acronym in the array', () => {
        Mock.stage = factory.create(Mock.primitiveJson);
        Mock.stage.updateSurveyAcronyms('TCLE');
        expect(Mock.stage.surveyAcronyms.includes('TCLE')).toBeFalsy();
    });
});
