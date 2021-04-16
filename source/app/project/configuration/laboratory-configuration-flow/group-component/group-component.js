(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('groupComponent', {
      controller: 'groupCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory-configuration-flow/group-component/group-template.html',
      bindings:{
        tubesMoments: '='
      }
    })
    .controller('groupCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;

    /*variables*/
    self.groups = [
      {
        name: "Default",
        type: "Default",
        tubeSet: [
          {
            count: 8,
            type: "DBS",
            moment: "NONE"
          },
          {
            count: 2,
            type: "DBS",
            moment: "JEJUM"
          }
        ]
      }
    ]
    self.selectedGroup = {};
    /* Lifecycle hooks */
    self.$onInit = onInit;
    self.separateTubesMoment = separateTubesMoment;

    /*public methods*/

    function onInit() {
    }

    function separateTubesMoment() {
      const group = groupBy(self.selectedGroup.tubeSet, 'type')
      self.tubesMoments = Object.values(group);
    }

    function groupBy(xs, key) {
      return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }
  }
}());
