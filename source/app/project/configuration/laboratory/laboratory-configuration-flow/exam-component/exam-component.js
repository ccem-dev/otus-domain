(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('examComponent', {
      controller: 'examCtrl as $ctrl',
      templateUrl: 'app/project/configuration/laboratory/laboratory-configuration-flow/exam-component/exam-template.html',
      bindings:{
        selectedExams: '='
      }
    })
    .controller('examCtrl', Controller);

  Controller.$inject = [
    '$q',
    '$mdToast',
    '$mdDialog',
  ];

  function Controller($q, $mdToast, $mdDialog) {
    var self = this;

    /*variables*/
    self.exams = [
      {
        _id: "123456",
        name: "TDHA syphilis",
        label: "TDHA sífilis"
      },
      {
        _id: "14455",
        name: "TDHA syphilis",
        label: "TDHA sífilis"
      }
    ];
    self.filteredExams = self.exams;
    self.selectedExam = {};
    /* Lifecycle hooks */
    self.$onInit = onInit;

    /*public methods*/
    self.addExam = addExam;
    self.removeExam = removeExam;

    function onInit() {
      _filterExams();
    }

    function addExam() {
      if(self.selectedExam.hasOwnProperty("_id")){
        self.selectedExams.push(self.selectedExam);
        self.selectedExam = "";
        _filterExams();
      }
    }

    function removeExam(exam) {
      const index = self.selectedExams.indexOf(exam);
      self.selectedExams.splice(index, 1);
      _filterExams();
    }

    function _filterExams() {
      self.filteredExams = self.exams.filter((exam) => {
        return self.selectedExams.every(selectedExam => exam._id !== selectedExam._id)
      });
    }
  }
}());
