describe('SurveyTemplateConfigurationService_UnitTest_Suite', () => {
    let service;
    let Injections = [];
    let Mock = {};

    beforeEach(() => {
        angular.mock.module('otusDomain.dashboard', 'otusDomain.rest', 'otus.client' );
        angular.mock.inject(($injector, $rootScope, $q) => {
            Injections.StageConfigurationService = $injector.get('otusDomain.dashboard.StageConfigurationService');
            service = $injector.get('otusDomain.dashboard.SurveyTemplateConfigurationService', Injections);
            mockInitialize($injector, $rootScope, $q);
            spyOn(Injections.StageConfigurationService, "loadStages").and.returnValue(Mock.loadStagesDeffered.promise);
            spyOn(Injections.StageConfigurationService, "updateStagesOfSurveyAcronym");
        });
    });

    function mockInitialize($injector, $rootScope, $q){
        Mock.stageFactory = $injector.get('otusDomain.dashboard.StageFactory')
        Mock.loadStages = Test.utils.data.stageJsons.map(json => Mock.stageFactory.create(json));
        Mock.loadStagesDeffered = $q.defer();
        Mock.loadStagesDeffered.resolve(Mock.loadStages);
        Mock.scope = $rootScope.$new();
        Mock.acronym = 'CURC';
        Mock.stage = Mock.stageFactory.create(Test.utils.data.stageJsons[3]);
        Mock.updateDto = {
            "acronym": Mock.acronym,
            "stageIdsToAdd": ['123456789abcdef'],
            "stageIdsToRemove": ['fedcba987654321']
        };
    }

    it('serviceExistence_check', () => {
        expect(service).toBeDefined();
    });

    it('serviceMethodsExistence_check', () => {
        expect(service.fetchStages).toBeDefined();
        expect(service.captureUpdateStages).toBeDefined();
        expect(service.updateStagesOfSurveyAcronym).toBeDefined();
    });

    it('fetchStages method should return encapsulatedStageArrays', () => {
        let expectLoadStages = service.fetchStages(Mock.acronym);
        Mock.scope.$digest();
        expect(expectLoadStages.$$state.value.allStages.length).toBe(4);
        expect(expectLoadStages.$$state.value.surveyStages.length).toBe(3);
    });

    it('captureUpdateStages method should return updateStagesByAcronymArtfacts ', () => {
        service.captureUpdateStages(Mock.acronym, [Mock.stage])
            .then( artefact => {
                expect(artefact.acronym).toBe(Mock.acronym);
                expect(artefact.stageIdsToAdd.length).toBe(1);
            })
        Mock.scope.$digest();
    });

    it('updateStagesOfSurveyAcronym method should evoke updateStagesOfSurveyAcronym by StageConfigurationService ', () => {
        service.updateStagesOfSurveyAcronym(Mock.updateStageDto);
        expect(Injections.StageConfigurationService.updateStagesOfSurveyAcronym).toHaveBeenCalledTimes(1);

    });
});
