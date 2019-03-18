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
    'usersStatisticalDataFactory',
    '$mdDialog'
  ];

  function Controller(StatisticalDataFactory, $mdDialog) {
    var self = this;

    self.ready = false;
    self.$onInit = onInit;

    function onInit() {
      self.statisticData = StatisticalDataFactory.create(self.users).toJSON();
      self.ready = true;
    }

    self.show = function() {
      $mdDialog.show({
        parent: "body",
        controller: DialogController,
        controllerAs: "$ctrl",
        templateUrl: "app/project/otus-user/statistical-data/template/statistical-dialog-template.html" ,
        clickOutsideToClose: true,
        ok: "OK",
        ariaLabel:"Dados de usuários",
        locals:{
          users: self.users
        }
      });
    };
    
    function DialogController(StatisticalDataFactory, $mdDialog) {
      var vm = this;
      vm.users = self.users;
      vm.statisticData = StatisticalDataFactory.create(vm.users).toJSON();

      vm.getStyle = function () {
        return {
          "border-left": "1px inset rgba(215, 215, 215, 1)",
        };
      };

      vm.exit = function () {
        $mdDialog.cancel();
      }
    }

    DialogController.$inject = [
      'usersStatisticalDataFactory',
      '$mdDialog',
      '$compile',
      '$scope'
    ];

  }

})();
