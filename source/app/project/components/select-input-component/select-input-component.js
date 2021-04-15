(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('selectInputComponent', {
      controller: 'selectInputCtrl as $ctrl',
      templateUrl: 'app/project/components/select-input-component/select-input-template.html',
      bindings:{
        labelText: '<',
        model: '=',
        data: '=',
        field: '<',
        placeholder: "<",
      }
    })
    .controller('selectInputCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;
  }
}());
