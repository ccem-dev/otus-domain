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
        self.surveyAcronyms = stageData.surveyAcronyms || [];

        self.getId = getId;
        self.getName = getName;
        self.getSurveyAcronyms = getSurveyAcronyms;
        self.toJSON = toJSON;

        function getId(){
            return self._id;
        }

        function getName(){
            return self.name;
        }

        function getSurveyAcronyms(){
            return self.surveyAcronyms;
        }

        function toJSON(){
            let json = {
                _id: self._id,
                objectType: self.objectType,
                name: self.name,
                surveyAcronyms: self.surveyAcronyms
            }
            return json;
        }

        return self;
    }

}());
