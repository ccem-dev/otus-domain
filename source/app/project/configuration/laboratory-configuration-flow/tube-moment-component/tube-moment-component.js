(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('tubeMoment', {
      controller: 'tubeMomentCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory-configuration-flow/tube-moment-component/tube-moment-template.html',
      bindings:{
        tubesMoments: '=',
        selectedTube: '=',
        selectedMoment: '='
      }
    })
    .controller('tubeMomentCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;

    /*variables*/
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.onChange = onChange;
    /*public methods*/

    function onInit() {
    }

    function onChange() {
      console.info(self.selectedTube);
    }
  }
}());
