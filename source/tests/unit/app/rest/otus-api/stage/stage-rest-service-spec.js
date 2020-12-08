describe('StageRestService_UnitTest_Suite', () => {
    const UNINITIALIZED_REST_ERROR_MESSAGE = 'REST resource is not initialized.';
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
            create: () => {
                return {$promise: Promise.resolve()}
            },
            update: () => {
                return {$promise: Promise.resolve()}
            },
            delete: () => {
                return {$promise: Promise.resolve()}
            },
            getAll: () => {
                return {$promise: Promise.resolve()}
            },
            getById: () => {
                return {$promise: Promise.resolve()}
            },
            updateStagesOfSurveyAcronym: () => {
                return {$promise: Promise.resolve()}
            }

        };
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
        expect(service.initialize).toBeDefined();
        expect(service.create).toBeDefined();
        expect(service.update).toBeDefined();
        expect(service.remove).toBeDefined();
        expect(service.getAll).toBeDefined();
        expect(service.getById).toBeDefined();
        expect(service.updateStagesOfSurveyAcronym).toBeDefined();

    });

    it('initialize method should evoke getStageResourceFactory by OtusRestResourceService', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory');
        service.initialize();
        expect(Injections.OtusRestResourceService.getStageResourceFactory).toHaveBeenCalledTimes(1);
    });

    it('create method should return promise by mock otus-client', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory').and.returnValue(Mock._rest);
        service.initialize();
        expect(service.create(Mock.stageJson)).toBePromise();
    });

    it('update Mock.stageJson._id, method should return promise by mock otus-client', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory').and.returnValue(Mock._rest);
        service.initialize();
        expect(service.update(Mock.stageJson._id, Mock.stageJson)).toBePromise();
    });

    it('remove Mock.stageJson._id, method should return promise by mock otus-client', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory').and.returnValue(Mock._rest);
        service.initialize();
        expect(service.remove(Mock.stageJson._id)).toBePromise();
    });

    it('getAll Mock.stageJson._id, method should return promise by mock otus-client', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory').and.returnValue(Mock._rest);
        service.initialize();
        expect(service.getAll()).toBePromise();
    });

    it('getById Mock.stageJson._id, method should return promise by mock otus-client', () => {
        spyOn(Injections.OtusRestResourceService, 'getStageResourceFactory').and.returnValue(Mock._rest);
        service.initialize();
        expect(service.getById(Mock.stageJson._id)).toBePromise();
    });

    it('updateStagesOfSurveyAcronym method should return promise by mock otus-client', () => {
        service.initialize();
        expect(service.updateStagesOfSurveyAcronym(Mock.stageDtoJson)).toBePromise();
    });

    it('create method should throw error when the factory of client is not available', () => {
        expect(service.create).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('update method should throw error when the factory of client is not available', () => {
        expect(service.update).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('remove method should throw error when the factory of client is not available', () => {
        expect(service.remove).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('getAll method should throw error when the factory of client is not available', () => {
        expect(service.getAll).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('getById method should throw error when the factory of client is not available', () => {
        expect(service.getById).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
    });

    it('updateStagesOfSurveyAcronym method should throw error when the factory of client is not available', () => {
        expect(service.updateStagesOfSurveyAcronym).toThrowError(Error, UNINITIALIZED_REST_ERROR_MESSAGE);
    });
});
