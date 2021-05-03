(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('laboratoryConfigurationList', {
      controller: 'laboratoryConfigurationListCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory/laboratory-configuration-flow/configuration-list-component/configuration-list-template.html',
      bindings:{
      }
    })
    .controller('laboratoryConfigurationListCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;

    /*variables*/
    self.configurationList = []

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /*public methods*/

    function onInit() {
      list();
    }

    function list() {
      self.configurationList = [
        {
          _id: "1234",
          moment: {
            _id: "3213540",
            name: "Fasting",
            label: "Jejum"
          },
          tube: {
            _id: "332133",
            type: "Cryotube",
            label: "Criotubo",
            color: "#02d45d",
            exams: [
              {
                _id: "123456",
                name: "TDHA syphilis",
                label: "TDHA sífilis exemplo"
              },
              {
                _id: "123456",
                name: "TDHA syphilis",
                label: "TDHA sífilis exemplo 2"
              }
            ],
            aliquots: [
              {
                _id: '123456',
                name: "TDHA syphilis",
                label: "TDHA sifilis",
                type: "exam",
                exams: [
                  {
                    _id: "123456",
                    name: "TDHA syphilis",
                    label: "TDHA sífilis"
                  }
                ]
              },
              {
                _id: '123456',
                name: "TDHA syphilis",
                label: "TDHA sifilis",
                type: "exam",
                exams: [
                  {
                    _id: "123456",
                    name: "TDHA syphilis",
                    label: "TDHA sífilis"
                  }
                ]
              }
            ]
          }
        }
      ]
    }
  }
}());
