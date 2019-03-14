(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('usersStatisticalData', {
      templateUrl: 'app/project/otus-user/statistical-data/users-statistical-data-template.html',
      controller: 'usersStatisticalDataCtrl as $ctrl',
      bindings:{
        users: "="
      }
    }).controller('usersStatisticalDataCtrl', Controller);

  Controller.$inject = [
    'usersStatisticalDataFactory'
  ];

  function Controller(StatisticalDataFactory) {
    var self = this;

    self.ready = false;
    self.$onInit = onInit;

    function onInit() {
      self.statisticData = StatisticalDataFactory.create(self.users).toJSON();
      self.ready = true;
    }

    self.getStyle = function () {
      return {
        "border-left": "1px inset rgba(215, 215, 215, 1)"
      };
    }

  }

})();
