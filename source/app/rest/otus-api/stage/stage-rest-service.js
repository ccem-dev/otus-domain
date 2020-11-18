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

        function updateStagesOfSurveyAcronym(stageDtoJson){
            if (!_rest) restOffLine();
            return _rest.updateStagesOfSurveyAcronym(stageDtoJson).$promise;
        }

        function restOffLine() {
            throw new Error('REST resource is not initialized.');
        }
    }
}())
