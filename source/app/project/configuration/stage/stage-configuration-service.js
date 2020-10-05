(function () {
    'use strict';

    angular.module('otusDomain.dashboard')
        .service('otusDomain.dashboard.StageConfigurationService', Service);

    Service.$inject = [
        'otusDomain.dashboard.StageFactory'
    ];

    function Service(stageFactory) {
        const self = this;

        self.addStage = addStage;
        self.loadStages = loadStages;

        function addStage(stageData){
            return stageFactory.create(stage);
        }

        function loadStages(){
            let stages = [];
            let stage1 = stageFactory.create({ name: "Onda 1"});
            let stage2 = stageFactory.create({ name: "Onda 2"});
            let stage3 = stageFactory.create({ name: "Covid"});
            stages.push(stage1);
            stages.push(stage2);
            stages.push(stage3);
            return stages;
        }
    }

}());
