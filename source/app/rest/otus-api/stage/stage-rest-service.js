(function () {
    'use strict';

    angular.module('otusDomain.rest')
        .service('StageRestService', StageRestService);

    StageRestService.$inject = [
        'OtusRestResourceService'
    ];

    function StageRestService(OtusRestResourceService) {
        const self = this;
        let _rest = null;

        /* Public methods */
        self.initialize = initialize;
        self.create = create;
        self.update = update;
        self.remove = remove;
        self.getAll = getAll;
        self.getById = getById;
        self.updateStagesOfSurveyAcronym = updateStagesOfSurveyAcronym;

        function initialize() {
            _rest = OtusRestResourceService.getStageResourceFactory();
        }

        function create(stageJson) {
            if (!_rest) restOffLine();
            return _rest.create(stageJson).$promise;
        }

        function update(id, data) {
            if (!_rest) restOffLine();
            return _rest.update({id}, data).$promise;
        }

        function remove(id) {
            if (!_rest) restOffLine();
            return _rest.delete({id}).$promise;
        }

        function getAll() {
            if (!_rest) restOffLine();
            return _rest.getAll().$promise;
        }

        function getById(id) {
            if (!_rest) restOffLine();
            return _rest.getById(id).$promise;
        }

        function updateStagesOfSurveyAcronym(updateStageDto){
            alert("arrive in rest updateStage")
            return new Promise((resolve, reject) => resolve({"OK": updateStageDto}))
            // return new Promise((resolve, reject) => reject({"ERROR": "error"}))
            // if (!_rest) restOffLine();
            // return _rest.updateAvailableSurveyInStage(stage.getId(), stage.getSurveyAcronyms()).$promise;
        }

        function restOffLine() {
            throw new Error('REST resource is not initialized.');
        }
    }
}())
