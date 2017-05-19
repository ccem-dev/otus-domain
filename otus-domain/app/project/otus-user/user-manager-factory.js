(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .factory('UserManagerFactory', Factory);

  function Factory() {
    var self = this;

    self.create = create;

    function create(resource) {
      return new UserManager(resource);
    }

    return self;
  }

  function UserManager(resource) {
    var self = this;

    self.enable = enable;
    self.disable = disable;
    self.list = list;
    self.updateFieldCenter = updateFieldCenter;

    function enable(user) {
      return resource.enable(user).$promise;
    }

    function disable(user) {
      return resource.disable(user).$promise;
    }

    function list() {
      return resource.list().$promise;
    }

    function updateFieldCenter(user) {
      return resource.updateFieldCenter(user).$promise;
    }

  }

}());
