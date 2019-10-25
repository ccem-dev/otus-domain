(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .factory('usersStatisticalDataFactory', Factory);

  function Factory() {
    var self = this;

    self.create = create;

    function create(users) {
      return new UserStatisticalDataFactory(users)
    }

    return self;
  }

  function UserStatisticalDataFactory(users) {
    var self = this;
    var _statisticData = {};
    var _jsonStructure = {};
    var centers;
    self.toJSON = toJSON;

    _build();

    function _build(){
      if(users) {
        _statisticData.centers = [];
        _statisticData.total = users.length;

        _statisticData.inactive = users.filter(function (user) {
          return user.enable == false;
        }).length;

        _statisticData.usersOfExtraction = users.filter(function (user) {
          return user.extraction == true;
        }).length;

        centers = users.map(function (user) {
          return user.fieldCenter.acronym;
        });

        centers.sort();

        var result = {};

        for (let i = 0; i < centers.length; ++i) {
          if (!result[centers[i]])
            result[centers[i]] = 0;
          ++result[centers[i]];
        }

        centers = Object.keys(result);
        var index = centers.indexOf("undefined");
        var values = Object.values(result);

        if(index > -1){

          centers.splice(index, 1);
          values.splice(index, 1);
        }

        for (let i = 0; i < centers.length; i++) {
          _statisticData.centers.push({
            acronym: centers[i],
            total: values[i],
          })
        }
        _jsonStructure = {
          total: _statisticData.total,
          inactive: _statisticData.inactive,
          usersOfExtraction: _statisticData.usersOfExtraction,
          centers: _statisticData.centers
        }
      }
    }

    function toJSON() {

      return _jsonStructure;
    }
  }
})();
