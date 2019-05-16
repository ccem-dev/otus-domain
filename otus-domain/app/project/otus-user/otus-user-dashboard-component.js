(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusUserDashboard', {
      templateUrl: 'app/project/otus-user/otus-user-dashboard-template.html',
      controller: 'otusUserCtrl as $ctrl'
    })
    .controller('otusUserCtrl', Controller);

  Controller.$inject = [
    'OtusRestResourceService',
    'UserManagerFactory',
    '$compile',
    '$scope',
    'ProjectPermissionService', //todo check if still in use
    'PERMISSION_LIST',
    '$mdDialog'
  ];

  function Controller(OtusRestResourceService, UserManagerFactory, $compile, $scope, ProjectPermissionService, PERMISSION_LIST, $mdDialog) {
    var self = this;
    var _userResource;
    var _fieldCenterResource;
    var _UserManager;

    self.users = [];
    self.fieldCenters = [];
    self.activeUsers = true;
    self.extractionUsers = false;
    self.userCenter = "";

    self.$onInit = onInit;
    self.selectedUserChange = selectedUserChange;
    self.searchUser = searchUser;
    self.filterUsersActives = filterUsersActives;
    self.filterUsersExtraction = filterUsersExtraction;
    self.filterUsersCenter = filterUsersCenter;
    self.filterUsers = filterUsers;
    self.updateUsers = _updateUsers;

    function onInit() {
      self.selectedUser = null;
      _userResource = OtusRestResourceService.getUserResource();
      _fieldCenterResource = OtusRestResourceService.getOtusFieldCenterResource();
      _UserManager = UserManagerFactory.create(_userResource);
      _loadUsers();
    }

    function _renderStatisticalComponent() {
      var html = $compile('<users-statistical-data users="$ctrl.allUsers" layout-align="start space-between" ng-if="$ctrl.allUsers" flex></users-statistical-data>')($scope);
      angular.element(document.getElementById("statisticComponent")).html("");
      angular.element(document.getElementById("statisticComponent")).append(html)
    }

    function _loadUsers() {
      _UserManager.list().then(function(httpResponse) {
        self.allUsers = httpResponse.data;
        _renderStatisticalComponent();
        _loadFieldCenters();
        self.filterUsers();
      }).catch(function (err) {
        console.error(err);
      });
    }

    function _updateUsers() {
      _UserManager.list().then(function(httpResponse) {
        self.allUsers = httpResponse.data;
        self.filterUsersActives();
        _renderStatisticalComponent()
      });
    }

    function _loadFieldCenters() {
      _fieldCenterResource.getAll(function(httpResponse) {
        self.fieldCenters = httpResponse.data;
      });
    }

    function filterUsersActives() {
      if (self.activeUsers){
        self.users = angular.copy(self.allUsers.filter(function (user) {
          return user.enable == true;
        }));
      }else {
        self.users = angular.copy(self.allUsers);
      }
      self.filterUsersCenter();
    }

    function filterUsersCenter() {
      self.selectCenter = self.fieldCenters.find(function (center) {
        return center.acronym === self.userCenter;
      });
      if (self.selectCenter){
        self.users = angular.copy(self.users.filter(function (user) {
          return user.fieldCenter.acronym == self.userCenter;
        }));
      }
      self.filterUsersExtraction();
    }

    function filterUsersExtraction() {
      if (self.extractionUsers){
        self.users = angular.copy(self.users.filter(function (user) {
          return user.extraction == true;
        }));
      }
    }

    function filterUsers() {
      _clearSelectUser();
      if(!self.activeUsers && !self.extractionUsers && !self.selectCenter){
        self.users = angular.copy(self.allUsers);
      }
      self.filterUsersActives();
    }

    function _clearSelectUser(){
      self.searchText = '';
      delete self.selectedUser;
    }

    function selectedUserChange(user){
      self.selectedUser = user;
      if (!user) {
        delete self.selectedUser;
      }
    }

    function searchUser (query) {
      return query ? self.users.filter(_createFilterFor(query)) : self.users;
    }

    function _createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();
      return function filterFn(user) {
        return (user.name.toLowerCase().indexOf(lowercaseQuery) >= 0 ||
          user.email.toLowerCase().indexOf(lowercaseQuery) >= 0 ||
          user.surname.toLowerCase().indexOf(lowercaseQuery) >= 0);
      };
    }

    function _showDialog(message) {
      $mdDialog.show(
        $mdDialog.alert()
          .htmlContent(message)
          .ok("OK")
      );
    }
  }

})();
