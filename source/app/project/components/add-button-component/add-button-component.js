(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('addButtonComponent', {
      controller: 'addButtonCtrl as $ctrl',
      templateUrl: 'app/project/components/add-button-component/add-button-template.html',
      bindings:{
        buttonClass: '<',
        buttonText: '<',
        action: '=',
        actionValue: "="
      }
    })
    .controller('addButtonCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;

    self.$onInit = function () {
    }
  }
}());
