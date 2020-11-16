(function () {
    'use strict';

    angular.module('otusDomain.dashboard')
        .service('otusDomain.dashboard.SurveyTemplateConfigurationService', Service);

    Service.$inject = [
        'otusDomain.dashboard.StageConfigurationService'
    ];

    function Service(StageConfigurationService) {
        const self = this;

        self.fetchStages = fetchStages;
        self.captureUpdateStages = captureUpdateStages;
        self.updateStagesOfSurveyAcronym = updateStagesOfSurveyAcronym;

        function fetchStages(acronym) {
            return StageConfigurationService.loadStages()
                .then((data) => {
                    let allStages = data;
                    let surveyStages = data.filter(stage => stage.getSurveyAcronyms().includes(acronym))
                    return {allStages, surveyStages};
                })
        }

        function captureUpdateStages(acronym, updateCandidateStage) {
            return fetchStages(acronym)
                .then(data => {
                    let originalStages = data.surveyStages.map((stage) => stage.getId());
                    let updateStages = updateCandidateStage.map(stage => stage.getId());

                    let toRemove = originalStages.filter(stage => !updateStages.includes(stage));
                    let toAdd = updateStages.filter(stage => !originalStages.includes(stage));

                    return {
                        "acronym": acronym,
                        "stageIdsToAdd": toAdd,
                        "stageIdsToRemove": toRemove
                    }
                })
        }

        function updateStagesOfSurveyAcronym(updateStageDto) {
            console.log(updateStageDto)
            return StageConfigurationService.updateStagesOfSurveyAcronym(updateStageDto);
        }
    }
}());
