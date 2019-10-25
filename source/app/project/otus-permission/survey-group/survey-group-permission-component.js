(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('surveyGroupPermission', {
      templateUrl: 'app/project/otus-permission/survey-group/survey-group-permission-template.html',
      controller: 'surveyGroupPermissionCtrl as $ctrl',
    })
    .controller('surveyGroupPermissionCtrl', Controller);

  Controller.$inject = [
    'PERMISSION_LIST',
    'otusDomain.project.activity.SurveyGroupConfigurationService',
    '$element',
    'ProjectPermissionService',
    '$mdToast'
  ];

  function Controller(PERMISSION_LIST, SurveyGroupConfigurationService, $element, ProjectPermissionService, $mdToast) {
    var self = this;

    self.$onInit = onInit;
    self.existsGroup = existsGroup;
    self.isIndeterminateGroups = isIndeterminateGroups;
    self.isCheckedGroup = isCheckedGroup;
    self.toggleAllGroups = toggleAllGroups;
    self.clearSearchTerm = clearSearchTerm;
    self.save = save;

    self.surveysGroups = [];
    self.selectedGroups = [];
    self.groupList = [];
    self.error = false;


    function onInit() {
      _fetchPermission();
      _getListOfSurveyGroups();
      $element.find('#searchBlock').on('keydown', function (ev) {
        ev.stopPropagation();
      });
    }


    function _fetchPermission() {
      try {
        self.permission = ProjectPermissionService.getPermissionByType(PERMISSION_LIST.SURVEY_GROUP);
      } catch (e) {
        self.error = true;
        throw "Erro ao recuperar informações de " + PERMISSION_LIST.SURVEY_GROUP ;
      }
    }

    function _isEqual(arrayOne, arrayTwo) {
      arrayOne.sort();
      arrayTwo.sort();
      return JSON.stringify(arrayTwo) === JSON.stringify(arrayOne)
    }

    function save() {
      var _originalGroups = angular.copy(self.permission.groups);

      if (!_isEqual(self.permission.groups, self.selectedGroups)) {
        self.permission.groups = self.selectedGroups;
        ProjectPermissionService.savePermission(self.permission)
          .then(function (response) {
            _showToast("Permissão de Grupo salva com sucesso.")

          })
          .catch(function () {
            self.permission.groups = _originalGroups;
            _showToast("Não foi possível salvar permissão.")
          });
      } else {
        _showToast("Não houve modificações na permissão.")
      }
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
          .position("bottom right")
          .hideDelay(3000)
      );
    }

  }
})();