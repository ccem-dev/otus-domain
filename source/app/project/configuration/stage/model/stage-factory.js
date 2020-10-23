(function () {
    'use strict';

    angular.module('otusDomain.dashboard')
        .factory('otusDomain.dashboard.StageFactory', factory);

    function factory() {
        const self = this;
        self.create = create;

        function create(stageData) {
            return new Stage(stageData);
        }
        return self;
    }

    function Stage(stageData){
        const self = this;

        self._id = stageData._id;
        self.objectType = 'Stage'
        self.name =  stageData.name;

        self.getId = getId;
        self.getName = getName;
        self.toJSON = toJSON;

        function getId(){
            return self._id;
        }

        function getName(){
            return self.name;
        }

        function toJSON(){
            let json = {
                _id: self._id,
                objectType: self.objectType,
                name: self.name
            }
            return json;
        }

        return self;
    }

}());
