(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusUser', {
      templateUrl: 'app/project/otus-user/otus-user-template.html',
      controller: 'otusUserCtrl as $ctrl'
    })
    .controller('otusUserCtrl', Controller);

  Controller.$inject = [
    'OtusRestResourceService',
    'UserManagerFactory',
    '$compile',
    '$scope'
  ];

  function Controller(OtusRestResourceService, UserManagerFactory, $compile, $scope) {
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
        filterUsers();
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

        self.fieldCenters.forEach(function (center) {
          var _total = self.allUsers.filter(function (user) {
            return user.fieldCenter.acronym == center.acronym;
          }).length;
          self.statisticData.centers.push({
            acronym: center.acronym,
            total: _total
          });
        });

      });
    }

    function selectedUserChange(user){
      self.selectedUser = user;
      _renderStatisticalComponent();
    }

    function searchUser (query) {
      return query ? self.users.filter(_createFilterFor(query)) : self.users;
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

    function _createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();
      return function filterFn(user) {
        return (user.name.toLowerCase().indexOf(lowercaseQuery) >= 0 ||
          user.email.toLowerCase().indexOf(lowercaseQuery) >= 0 ||
          user.surname.toLowerCase().indexOf(lowercaseQuery) >= 0);
      };
    }
  }

})();
