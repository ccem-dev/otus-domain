(function () {
    'use strict';

    angular.module('otusDomain.dashboard')
        .service('otusDomain.dashboard.SurveyTemplateConfigurationService', Service);

    Service.$inject = [
        'otusDomain.dashboard.StageConfigurationService'
    ];

    function Service(StageConfigurationService) {
        const self = this;

        self.$onInit = onInit;
        self.fetchStages = fetchStages;
        self.updateAvailableSurveyInStage = updateAvailableSurveyInStage;

        function onInit() {
        }

        function fetchStages(acronym) {
            return StageConfigurationService.loadStages()
                .then((data) => {
                    let allStages = data;
                    let surveyStages = data.filter(stage => stage.getSurveyAcronyms().includes(acronym))
                    return {allStages, surveyStages};
                })
        }

        function updateAvailableSurveyInStage(stageCandidates) {
            stageCandidates.forEach(stage =>
                StageConfigurationService.updateAvailableSurveyInStage(stage)
                    .then(() => console.log("loop")))
        }

        // self.surveyForm.stages.forEach(stage => {
        //     SurveyTemplateConfigurationService.updateAvailableSurveyInStage(stage)
        //         .then(data => console.log(data))
        // })

    }
}());
