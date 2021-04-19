(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('aliquotsExamsComponent', {
      controller: 'aliquotsExamsCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory-configuration-flow/aliquots-exams-component/aliquots-exams-template.html',
      bindings:{
        selectedExams: "=",
        selectedAliquots: '='
      }
    })
    .controller('aliquotsExamsCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;

    self.selectedAliquot = {};
    self.selectedExam = {};

    /* Lifecycle hooks */
    self.$onInit = onInit;

    /*public methods*/
    self.addExam = addExam;
    self.removeExam = removeExam;
    self.removeAliquot = removeAliquot;
    self.addAliquot = addAliquot;
    self.removeAliquotsExam = removeAliquotsExam;

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

    function removeAliquotsExam(aliquot, exam) {
      const index = aliquot.exams.indexOf(exam);
      aliquot.exams.splice(index, 1);
      // _filterAliquots();
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
