(function () {
    'use strict';

    angular.module('otusDomain.dashboard')
        .service('otusDomain.dashboard.StageConfigurationService', Service);

    Service.$inject = [
        'otusDomain.dashboard.StageFactory',
        'StageRestService'
    ];

    function Service(stageFactory, stageRestService) {
        const self = this;
        self.loadStages = loadStages;
        self.parseStage = parseStage;
        self.createStage = createStage;
        self.updateStage = updateStage;
        self.removeStage = removeStage;
        self.getStageById = getStageById;
        self.updateStagesOfSurveyAcronym = updateStagesOfSurveyAcronym;

        function loadStages(){
            return stageRestService.getAll().then( response => {
                let stages = response.data.map(stageJson => stageFactory.create(stageJson));
                return stages;
            });
        }

        function parseStage(stageData){
            return stageFactory.create(stageData);
        }

        function createStage(stageData){
            let stage = stageFactory.create(stageData);
            return stageRestService.create(stage.toJSON());
        }

        function removeStage(stageId){
            return stageRestService.remove(stageId);
        }

        function updateStage(stage) {
            return stageRestService.update(stage.getId(), { name: stage.getName() });
        }

        function getStageById(stageId){
            return stageRestService.getById(stageId);
        }

        function updateStagesOfSurveyAcronym(updateStageDto) {
            return stageRestService.updateStagesOfSurveyAcronym(updateStageDto);
        }
    }

}());
