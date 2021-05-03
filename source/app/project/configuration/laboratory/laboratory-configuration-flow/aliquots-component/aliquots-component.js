(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('aliquotsComponent', {
      controller: 'aliquotsCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory/laboratory-configuration-flow/aliquots-component/aliquots-template.html',
      bindings:{
        selectedExams: "=",
        selectedAliquots: '='
      }
    })
    .controller('aliquotsCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;

    /*variables*/
    self.aliquots = [
      {
        _id: '123456',
        name: "TDHA syphilis",
        label: "TDHA sifilis",
        exams: []
      },
      {
        _id: '31254',
        name: "ALL",
        label: "ALII",
        exams: []
      }
    ]
    self.selectedAliquot = {};
    self.filteredAliquots = self.aliquots;

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /*public methods*/
    self.addExam = addExam;
    self.removeExam = removeExam;
    self.removeAliquot = removeAliquot;
    self.addAliquot = addAliquot;

    function onInit() {
    }

    function addAliquot() {
      if(self.selectedAliquot.hasOwnProperty("_id")){
        self.selectedAliquots.push(self.selectedAliquot);
        self.selectedAliquot = "";
        _filterAliquots();
      }
    }

    function removeAliquot(aliquot) {
      const index = self.selectedAliquots.indexOf(aliquot);
      self.selectedAliquots.splice(index, 1);
      _filterAliquots();
    }

    function addExam(aliquot) {
      if(self.selectedExam.hasOwnProperty("_id")){
        aliquot.exams.push(self.selectedExam);
        self.selectedExam = "";
      }
    }

    function removeExam(exam) {
      const index = self.selectedExams.indexOf(exam);
      self.selectedExams.splice(index, 1);
      // _filterExams();
    }

    function _filterAliquots() {
      self.filteredAliquots = self.aliquots.filter((aliquot) => {
        return self.selectedAliquots.every(selectedAliquot => aliquot._id !== selectedAliquot._id)
      });
    }

    // function _filterAliquotExams(aliquot) {
    //   self.filteredAliquots = self.aliquots.filter((aliquot) => {
    //     return self.selectedAliquots.every(selectedAliquot => aliquot._id !== selectedAliquot._id)
    //   });
    // }
  }
}());
