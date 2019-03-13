(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusUser', {
      templateUrl: 'app/project/otus-user/otus-user-template.html',
      controller: Controller
    });

  Controller.$inject = [
    'OtusRestResourceService',
    'ExtractionRestService',
    'UserManagerFactory',
    '$mdDialog',
    '$mdToast'
  ];

  function Controller(OtusRestResourceService, ExtractionRestService, UserManagerFactory, $mdDialog, $mdToast) {
    var self = this;
    var _userResource;
    var _fieldCenterResource;
    var _UserManager;

    self.users = [];
    self.fieldCenters = [];
    self.activeUsers = true;
    self.extractionUsers = false;
    self.userCenter = "";
    var _updateNecessary = false;

    self.$onInit = onInit;
    self.selectedItemChange = selectedItemChange;
    self.searchUser = searchUser;
    self.filterUsersActives = filterUsersActives;
    self.filterUsersExtraction = filterUsersExtraction;
    self.filterUsersCenter = filterUsersCenter;
    self.filterUsers = filterUsers;
    self.alterUser = alterUser;

    function onInit() {
      self.selectedUser = null;
      _userResource = OtusRestResourceService.getUserResource();
      _fieldCenterResource = OtusRestResourceService.getOtusFieldCenterResource();
      _UserManager = UserManagerFactory.create(_userResource);
      _loadUsers();
      // _loadFieldCenters();
      self.statisticData = {};
      self.statisticData.centers = [];

      self.updateUsers = _updateUsers;
    }

    function _loadUsers() {
      _UserManager.list().then(function(httpResponse) {
        self.allUsers = httpResponse.data;
        self.statisticData.total = self.allUsers.length;
        self.statisticData.inatives = self.allUsers.filter(function (user) {
          return user.enable == false;
        }).length;
        self.statisticData.usersOfExtraction = self.allUsers.filter(function (user) {
          return user.extraction == true;
        }).length;
        _loadFieldCenters();
        filterUsers();
      });
    }

    function _updateUsers() {
      _UserManager.list().then(function(httpResponse) {
        self.allUsers = httpResponse.data;
        self.filterUsersActives();
        self.filterUsersCenter();
        self.filterUsersExtraction();
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
        console.log(self.statisticData)

      });
    }

    function selectedItemChange(user){
      self.selectedUser = user;
    }

    function searchUser (query) {
      if(_updateNecessary){
        _updateUsers();
      }
      return query ? self.users.filter(_createFilterFor(query)) : self.users;
    }

    function filterUsersActives() {
      if (self.activeUsers){
        self.users = angular.copy(self.allUsers.filter(function (user) {
          return user.enable == true;
        }));
      }
    }

    function filterUsersExtraction() {
      if (self.extractionUsers){
        self.users = angular.copy(self.users.filter(function (user) {
          return user.extraction == true;
        }));
      }
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
    }

    function filterUsers() {
      _clearSelectUser();
      if(!self.activeUsers && !self.extractionUsers && !self.selectCenter){
        self.users = angular.copy(self.allUsers);
      }
      self.filterUsersActives();
      self.filterUsersCenter();
      self.filterUsersExtraction();
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

    function alterUser(email) {
      return self.selectedUser === email;
    }
  }

})();
