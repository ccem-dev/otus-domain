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
        self.createStage = createStage;
        self.updateStage = updateStage;
        self.removeStage = removeStage;
        self.getStageById = getStageById;
        self.parseStage = parseStage;


        function loadStages(){
            // let stages = [];
            // let stage1 = createStage({ _id: "1i", name: "Onda 1"});
            // let stage2 = createStage({ _id: "2i", name: "Onda 2"});
            // let stage3 = createStage({ _id: "3i", name: "Covid"});
            // stages.push(stage1);
            // stages.push(stage2);
            // stages.push(stage3);
            // return stages;

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
    }

}());
