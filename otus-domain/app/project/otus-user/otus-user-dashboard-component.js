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
    'ProjectPermissionService'

  ];

  function Controller(OtusRestResourceService, UserManagerFactory, $compile, $scope, ProjectPermissionService) {
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
      var html = $compile('<users-statistical-data users="$ctrl.allUsers" ng-if="$ctrl.allUsers" flex>></users-statistical-data>')($scope);
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
      if (!user) delete self.managerUserPermission;
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

    self.getAllPermissions = getAllPermissions;

    function getAllPermissions() {
      if(self.selectedUser){
        ProjectPermissionService.getAll(self.selectedUser.email).then(function (response) {
          self.managerUserPermission = response;
          self.managerUserPermission.permissionList.forEach(function (permissionJson) {
            self.surveyGroupPermission = permissionJson.objectType == "SurveyGroupPermission"? permissionJson: null;
          })
        });
      } else {
        delete self.managerUserPermission;
      }


    }

    // function _renderPermission(permission) {
    //   let _template = ProjectPermissionService.getPermissionComponent(permission.objectType);
    //   $scope.permission = permission;
    //   let html = $compile(_template)($scope);
    //   angular.element(document.getElementById("listPermissions")).append(html)
    // }



  }

})();
