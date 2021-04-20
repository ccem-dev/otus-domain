(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('laboratoryConfiguration', {
      controller: 'laboratoryConfigurationCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory/laboratory-configuration/laboratory-configuration-template.html'
    })
    .controller('laboratoryConfigurationCtrl', Controller);

  Controller.$inject = [
    '$q',
    'otusDomain.LoadingScreenService',
    'otusDomain.rest.configuration.ProjectConfigurationService'
  ];

  function Controller($q, LoadingScreenService, ProjectConfigurationService) {
    var self = this;

    self.createTube = createTube;
    self.updateTube = updateTube;
    self.deleteTube = deleteTube;

    self.createAliquot = createAliquot;
    self.updateAliquot = updateAliquot;
    self.deleteAliquot = deleteAliquot;

    self.createMoment = createMoment;
    self.updateMoment = updateMoment;
    self.deleteMoment = deleteMoment;

    self.createExam = createExam;
    self.updateExam = updateExam;
    self.deleteExam = deleteExam;

    self.createGroup = createGroup;
    self.updateGroup = updateGroup;
    self.deleteGroup = deleteGroup;
    
    self.tubeHeaders = [
      { name: 'color', label: "Cor" },
      { name: 'type', label: "Tipo" },
      { name: 'label', label: "Label" }
    ]

    self.aliquotsHeaders = [
      { name: "name", label: "Nome" },
      { name: "type", label: "Tipo" }
    ]

    self.momentsHeaders = [
      { name: 'name', label: 'Nome' },
      { name: 'label', label: 'Label' }
    ]

    self.examsHeaders = [
      { name: "name", label: "Nome" },
      { name: "label", label: "Label" }
    ]

    self.groupsHeaders = [
      { name: "name", label: "Nome do grupo" },
      { name: "tube", label: "Tubo" },
      { name: "moment", label: "Momento" }
    ]

    self.tubeRecords = []
    self.aliquotsRecords = []
    self.momentsRecords = []
    self.examsRecords = []
    self.groupsRecords = []

    function createTube(data) {
      self.tubeRecords.push(data)
    }

    function updateTube(n, data) {
      self.tubeRecords[n] = data
    }

    function deleteTube(data) {
      self.tubeRecords.splice(self.tubeRecords.indexOf(data), 1)
    }

    function createAliquot(data) {
      self.aliquotsRecords.push(data);
    }

    function updateAliquot(n, data) {
      self.aliquotsRecords[n] = data
    }

    function deleteAliquot(data) {
      self.aliquotsRecords.splice(self.aliquotsRecords.indexOf(data), 1)
    }

    function createMoment(data) {
      self.momentsRecords.push(data);
    }

    function updateMoment(n, data) {
      self.momentsRecords[n] = data
    }

    function deleteMoment(data) {
      self.momentsRecords.splice(self.momentsRecords.indexOf(data), 1)
    }

    function createExam(data) {
      self.examsRecords.push(data);
    }

    function updateExam(n, data) {
      self.examsRecords[n] = data
    }

    function deleteExam(data) {
      self.examsRecords.splice(self.examsRecords.indexOf(data), 1)
    }

    function createGroup(data) {
      self.groupsRecords.push(data);
    }

    function updateGroup(n, data) {
      self.groupsRecords[n] = data
    }

    function deleteGroup(data) {
      self.groupsRecords.splice(self.groupsRecords.indexOf(data), 1)
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
