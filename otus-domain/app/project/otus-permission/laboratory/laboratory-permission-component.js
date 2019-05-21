(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('laboratoryPermission', {
      templateUrl: 'app/project/otus-permission/laboratory/laboratory-permission-template.html',
      controller: 'laboratoryPermissionController as $ctrl',
      bindings: {
        permission: "=",
      }
    })
    .controller('laboratoryPermissionController', Controller);

  Controller.$inject = [
  ];

  function Controller() {
    var self = this;

    self.$onInit =  function () {
      console.log(self.permission)
    };

    return self;
  }
})();