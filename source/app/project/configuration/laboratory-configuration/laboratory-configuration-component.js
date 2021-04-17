(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('laboratoryConfiguration', {
      controller: 'laboratoryConfigurationCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory-configuration/laboratory-configuration-template.html'
    })
    .controller('laboratoryConfigurationCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
    'otusDomain.LoadingScreenService',
    'otusDomain.rest.configuration.ProjectConfigurationService'
  ];

  function Controller($q, $mdToast, $mdDialog, LoadingScreenService, ProjectConfigurationService) {
    var self = this;
    self.createTube = createTube;
    self.editRecord = editRecord;
    self.deleteRecord = deleteRecord;
    
    self.tubeHeaders = [
      { name: 'color', label: "Cor" },
      { name: 'type', label: "Tipo" },
      { name: 'label', label: "Label" }
    ]    

    self.tubeRecords = [
      {
        color: "#44B55D",
        type: "Cryotube",
        label: "Criotubo"
      },
      {
        color: "#FF7400",
        type: "Cryotube 2",
        label: "Legenda 1"
      },
      {
        color: "#6288C7",
        type: "Tubo com nome grande pra ajudar a fazer regras pra quebrar linhas e/ou cortar o texto caso fique muito grande",
        label: "Na label também que é pra tela quebrar mesmo e pressionar o dev a querer consertar esse layout logo"
      }
    ]

    self.aliquotsHeaders = [
      { name: "name", label: "Nome" },
      { name: "type", label: "Tipo" }
    ]

    self.aliquotsRecords = [
      {
        name: "Alíquota 1",
        type: "Exame"
      },
      {
        name: "Alíquota 2",
        type: "Exame"
      },
      {
        name: "Alíquota 3",
        type: "Exame"
      }
    ]

    self.momentsHeaders = [
      { name: 'name', label: 'Nome' },
      { name: 'label', label: 'Label' }
    ]

    self.momentsRecords = [
      {
        name: "Jejum",
        label: "Label do primeiro momento"
      },
      {
        name: "Pós-carga",
        label: "Label do segundo momento"
      }
    ]

    self.examsHeaders = [
      { name: "name", label: "Nome" },
      { name: "label", label: "Label"}
    ]

    self.examsRecords = [
      {
        name: "Coleta de sangue",
        label: "Label do primeiro exame"
      },
      {
        name: "Exame 2",
        label: "Label do segundo exame"
      }
    ]

    self.groupsHeaders = [
      { name: "name", label: "Nome do grupo" },
      { name: "tube", label: "Tubo" },
      { name: "moment", label: "Momento" }
    ]

    self.groupsRecords = [
    ]

    function createTube() {
      console.log("creating tube")
    }

    function editRecord(record) {
      console.log("editing record")
      console.log(record)
    }

    function deleteRecord(record) {
      console.log("deleting record")
      console.log(record)
    }

    // var ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /* Public Interface*/
    function onInit() {

    }
  }
}());
