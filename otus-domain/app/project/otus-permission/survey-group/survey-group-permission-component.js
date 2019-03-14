(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('surveyGroupPermission', {
      templateUrl: 'app/project/otus-permission/survey-group/survey-group-permission-template.html',
      controller: Controller,
      bindings:{
        title : "@",
        permission: "=",
        controller: "="
      }
    });
  
  Controller.$inject = [
    'otusjs.survey.GroupManagerFactory',
    'SurveyGroupRestService',
    "$scope",
    '$element'
  ];
  
  function Controller(GroupManagerFactory, SurveyGroupRestService, $scope, $element) {

    var self = this;

    self.$onInit = onInit;
    self.existsGroup = existsGroup;
    self.isIndeterminateGroups = isIndeterminateGroups;
    self.isCheckedGroup = isCheckedGroup;
    self.toggleAllGroups = toggleAllGroups;
    self.clearSearchTerm = clearSearchTerm;

    self.surveysGroups = [];
    self.selectedGroups = [];
    self.groupList = [];

    onInit();



    // $scope.$watch("$ctrl.controller", function () {
    //   if (self.controller){
    //     self.groupList = self.controller.getGroupNames();
    //   }
    // });

    function onInit() {
      if(self.controller){

        self.selectedGroups = [];
        self.groupList = self.controller.getGroupNames();
        // _getListOfSurveyGroups();
        $element.find('#searchBlock').on('keydown', function(ev) {
          ev.stopPropagation();
        });
      }
    }


    function _getListOfSurveyGroups() {
      SurveyGroupRestService.getListOfSurveyGroups()
        .then(function (response) {
          self.surveysGroups= GroupManagerFactory.create(response);
          console.log(self.controller)
          // self.surveysGroups = self.groupManagerFactory.getGroupList();
          // self.surveysGroups = self.groupManagerFactory.getGroupNames();

        }).catch(function (e) {
        Promise.reject(e);
      });
    }


    function existsGroup(item) {
      return self.selectedGroups.indexOf(item) > -1;

    }

    function isIndeterminateGroups() {
      return (self.selectedGroups.length !== 0 &&
        self.selectedGroups.length !== self.groupList.length);
    }

    function isCheckedGroup() {
      return self.selectedGroups.length === self.groupList.length;
    }

    function toggleAllGroups() {

      if (self.selectedGroups.length === self.groupList.length) {
        self.selectedGroups = [];
      } else if (self.selectedGroups.length === 0 || self.selectedGroups.length > 0) {
        self.selectedGroups = self.groupList.slice(0);
      }
      // _groupsFilter();
    }

    function clearSearchTerm() {
      self.searchTerm = '';
    }
    
  }
})();