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

    self.toJSON = toJSON;

    _build();

    function _build(){
      if(users) {
        _statisticData.centers = [];
        _statisticData.total = users.length;

        _statisticData.inatives = users.filter(function (user) {
          return user.enable == false;
        }).length;

        _statisticData.usersOfExtraction = users.filter(function (user) {
          return user.extraction == true;
        }).length;

        let centers = users.map(function (user) {
          return user.fieldCenter.acronym;
        }).filter(function (value, index, users) {
          return users.indexOf(value) === index;
        });

        centers = users.map(function (user) {
          return user.fieldCenter.acronym;
        });

        let result = {};

        for (let i = 0; i < centers.length; ++i) {
          if (!result[centers[i]])
            result[centers[i]] = 0;
          ++result[centers[i]];
        }

        centers = Object.keys(result);
        let index = centers.indexOf("undefined");
        centers.splice(index, 1);
        let values = Object.values(result);
        values.splice(index, 1)

        for (let i = 0; i < centers.length; i++) {
          _statisticData.centers.push({
            acronym: centers[i],
            total: values[i],
          })
        }
      }
    }

    function toJSON() {
      return _statisticData;
    }
  }
})();
