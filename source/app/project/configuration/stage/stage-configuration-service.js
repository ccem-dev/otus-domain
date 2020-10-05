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
            return stageFactory.create(stageData);
        }

        function loadStages(){
            let stages = [];
            let stage1 = addStage({ _id: "1i", name: "Onda 1"});
            let stage2 = addStage({ _id: "2i", name: "Onda 2"});
            let stage3 = addStage({ _id: "3i", name: "Covid"});
            stages.push(stage1);
            stages.push(stage2);
            stages.push(stage3);
            return stages;
        }
    }

}());
