(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusPermissionManager', {
      templateUrl: 'app/project/otus-permission/manager/otus-permission-manager-template.html',
      controller: Controller
    });

    Controller.$inject = [
      'otusDomain.project.permission.OtusPermissionService',
      'OtusRestResourceService',
      'SurveyGroupRestService',
      'UserManagerFactory',
      'otusjs.survey.GroupManagerFactory',
      '$mdDialog',
      '$mdToast'
    ];

  function Controller(OtusPermissionService, OtusRestResourceService, SurveyGroupRestService, UserManagerFactory, GroupManagerFactory, $mdDialog, $mdToast) {
    var self = this;
    var groupManagerFactory;
    var _userResource;
    var _fieldCenterResource;
    var _confirmDialog;
    var _confirmExtractionDialog;
    var _UserManager;

    self.users = [];
    self.fieldCenters = [];

    self.activeUsers = true;


    self.$onInit = onInit;
    self.selectedItemChange = selectedItemChange;
    self.searchUser = searchUser;
    self.filterUsersActives = filterUsersActives;


    function onInit() {
      _userResource = OtusRestResourceService.getUserResource();
      _fieldCenterResource = OtusRestResourceService.getOtusFieldCenterResource();
      _UserManager = UserManagerFactory.create(_userResource);
      _createDialog();
      _loadUsers();
      _getListOfSurveyGroups();
    }

    function _getListOfSurveyGroups() {
      SurveyGroupRestService.getListOfSurveyGroups()
        .then(function (response) {
          self.groupManagerFactory = GroupManagerFactory.create(response);
        }).catch(function (e) {
           Promise.reject(e);
        });
    }

    function _loadUsers() {
      self.promise = _UserManager.list().$promise;
      _UserManager.list().then(function(httpResponse) {
        self.allUsers = httpResponse.data;
        filterUsersActives();
      });
    }

    function selectedItemChange(user){
      self.selectedUser = user;
    }

    function searchUser (query) {
      return query ? self.users.filter(_createFilterFor(query)) : self.users;
    }

    function filterUsersActives() {
      if (self.activeUsers){
        self.users = angular.copy(self.allUsers.filter(function (user) {
          return user.enable == true;
        }));
      } else {
        self.users = angular.copy(self.allUsers);
      }

    }

    function _createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();

      return function filterFn(user) {
        return (user.name.indexOf(lowercaseQuery) >= 0 || user.email.indexOf(lowercaseQuery) >= 0);
      };

    }


    function _createDialog() {
      _confirmDialog = $mdDialog.confirm()
        .title("DIALOG_TITLE")
        .textContent("DIALOG_TEXT_CONTENT")
        .ok('Sim')
        .cancel('Cancelar');

      _confirmExtractionDialog = $mdDialog.confirm()
        .title("EXTRACTION_DIALOG_TITLE")
        .textContent("EXTRACTION_DIALOG_TEXT_CONTENT")
        .ok('Sim')
        .cancel('Cancelar');
    }

    function _showToast(message) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(message)
      );
    }


  }

})();
