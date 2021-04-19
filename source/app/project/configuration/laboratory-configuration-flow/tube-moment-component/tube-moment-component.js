(function () {
  'use strict';

  angular
      .module('otusDomain.dashboard')
      .component('tubeMoment', {
        controller: 'tubeMomentCtrl as $ctrl',
        templateUrl: 'app/project/configuration/laboratory-configuration-flow/tube-moment-component/tube-moment-template.html',
        bindings:{
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
    self.tubes = [
      {
        _id: "332133",
        type: "Cryotube",
        label: "Criotubo"
      }
    ]
    self.moments = [
      {
        _id: "3213540",
        name: "Fasting",
        label: "Jejum"
      }
    ]
    /* Lifecycle hooks */
    self.$onInit = onInit;

    /*public methods*/

    function onInit() {
    }
  }
}());
