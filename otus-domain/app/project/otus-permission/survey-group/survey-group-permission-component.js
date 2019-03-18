(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('surveyGroupPermission', {
      templateUrl: 'app/project/otus-permission/survey-group/survey-group-permission-template.html',
      controller: Controller,
      bindings: {
        permission: "=",
      }
    });

  Controller.$inject = [
    'otusDomain.project.activity.SurveyGroupConfigurationService',
    "$scope",
    '$element',
    'ProjectPermissionService'
  ];

  function Controller(SurveyGroupConfigurationService, $scope, $element, ProjectPermissionService) {

    var self = this;

    self.$onInit = onInit;
    self.existsGroup = existsGroup;
    self.isIndeterminateGroups = isIndeterminateGroups;
    self.isCheckedGroup = isCheckedGroup;
    self.toggleAllGroups = toggleAllGroups;
    self.clearSearchTerm = clearSearchTerm;
    self.isModified = isModified;
    self.savePermission = savePermission;

    self.surveysGroups = [];
    self.selectedGroups = [];
    self.groupList = [];

    onInit();

    function onInit() {
      _getListOfSurveyGroups();
      $element.find('#searchBlock').on('keydown', function (ev) {
        ev.stopPropagation();
      });
      console.log(self.permission)
    }

    function isModified() {
      return _isEqual(self.permission.groups, self.selectedGroups);
    }

    function _isEqual(arrayOne, arrayTwo) {
      var type = Object.prototype.toString.call(arrayOne);
      if (type !== Object.prototype.toString.call(arrayTwo)) return false;
      if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
      var arrayOneLen = type === '[object Array]' ? arrayOne.length : Object.keys(arrayOne).length;
      var arrayTwoLen = type === '[object Array]' ? arrayTwo.length : Object.keys(arrayTwo).length;
      if (arrayOneLen !== arrayTwoLen) return false;
      return true;
    }

    function savePermission() {
      self.permission.groups = self.selectedGroups;
      ProjectPermissionService.savePermission(self.permission).then(function (response) {
        if(response.data){
          _showToast("Permissão de Grupo salva com sucesso.")
        }
      });
    }

    function _getListOfSurveyGroups() {
      SurveyGroupConfigurationService.getListOfSurveyGroups()
        .then(function (response) {
          self.surveysGroups = response;
          self.selectedGroups = self.permission ? angular.copy(self.permission.groups) : [];
          self.groupList = self.surveysGroups.getGroupNames();

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
    }

    function clearSearchTerm() {
      self.searchTerm = '';
    }

    function _showToast(message) {
      $mdToast.show(
        $mdToast.simple()
          .textContent(message)
          .hideDelay(3000)
      );
      self.updateUsers();
    }

  }
})();