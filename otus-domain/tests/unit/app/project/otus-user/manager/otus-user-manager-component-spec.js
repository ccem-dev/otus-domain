describe("Otus User Manager Component Tests", function () {
  var Mock = {};
  var Injections = {};
  var controller;

  beforeEach(function () {
    mockInjections();
    mockData();
    angular.mock.module('otusDomain.project', function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
      $provide.value('ExtractionRestService', Mock.ExtractionRestService);
      $provide.value('UserManagerFactory', Mock.UserManagerFactory);
      $provide.value('$mdDialog', Mock.$mdDialog);
      $provide.value('$mdToast', Mock.$mdToast);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_) {
      Injections = {
        'OtusRestResourceService': _$injector_.get('OtusRestResourceService'),
        'ExtractionRestService': _$injector_.get('ExtractionRestService'),
        'UserManagerFactory': _$injector_.get('UserManagerFactory'),
        '$mdDialog': _$injector_.get('$mdDialog'),
        '$mdToast': _$injector_.get('$mdToast')
      }
      controller = _$controller_('otusUserManagerCtrl', Injections);
      controller.updateUsers = function(){};
      controller.selectedUser = {
        extraction: true
      };
    });
  });

  beforeEach(function () {
    spyOn(Mock.OtusRestResourceService, "getUserResource").and.callThrough();
    spyOn(Mock.OtusRestResourceService, "getOtusFieldCenterResource").and.callThrough();
    spyOn(Mock.UserManagerFactory, "create").and.callThrough();
    spyOn(Mock.$mdDialog, "confirm").and.callThrough();
    spyOn(Mock.fieldCenterResource, "getAll").and.callThrough();
    spyOn(Mock.ExtractionRestService, "enableExtraction").and.callThrough();
    spyOn(Mock.ExtractionRestService, "disableExtraction").and.callThrough();
    spyOn(Mock.UserManager, "disable").and.callThrough();
    spyOn(Mock.UserManager, "enable").and.callThrough();
    spyOn(Mock.UserManager, "updateFieldCenter").and.callThrough();
    spyOn(controller, "updateUsers").and.callThrough();
  });

  it('should defined controller', function () {
    expect(controller.user).toBeUndefined();
    expect(controller.fieldCenters).toBeDefined();
    expect(controller.activeUsers).toBeDefined();
    expect(controller.activeUsers).toBeTruthy();
    expect(controller.extractionUsers).toBeDefined();
    expect(controller.extractionUsers).toBeFalsy();
    expect(controller.userCenter).toBeDefined();

    expect(controller.$onInit).toBeDefined();
    expect(controller.enableDisable).toBeDefined();
    expect(controller.updateFieldCenter).toBeDefined();
    expect(controller.enableDisableExtraction).toBeDefined();
  });

  it('should call onInit method', function () {
    controller.$onInit();
    expect(controller.user).toBeDefined();
    expect(Mock.OtusRestResourceService.getUserResource).toHaveBeenCalledTimes(1);
    expect(Mock.OtusRestResourceService.getOtusFieldCenterResource).toHaveBeenCalledTimes(1);
    expect(Mock.UserManagerFactory.create).toHaveBeenCalledTimes(1);
    expect(Mock.$mdDialog.confirm).toHaveBeenCalledTimes(2);
    expect(Mock.fieldCenterResource.getAll).toHaveBeenCalledTimes(1);
  });

  it('should call enableDisableExtraction method enable', function () {
    controller.$onInit();
    controller.enableDisableExtraction(Mock.USER_ENABLE);
    Mock.$mdDialog.show().then(function (params) {
      expect(Mock.ExtractionRestService.enableExtraction).toHaveBeenCalledTimes(1);
      expect(Mock.ExtractionRestService.enableExtraction).toHaveBeenCalledWith(Mock.USER_ENABLE)
      expect(Mock.ExtractionRestService.disableExtraction).toHaveBeenCalledTimes(0);
      Mock.ExtractionRestService.enableExtraction().then(function(params) {
        expect(controller.updateUsers).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('should call enableDisableExtraction method disable', function () {
    controller.$onInit();
    controller.enableDisableExtraction(Mock.USER_DISABLE);
    Mock.$mdDialog.show().then(function (params) {
      expect(Mock.ExtractionRestService.enableExtraction).toHaveBeenCalledTimes(0);
      expect(Mock.ExtractionRestService.disableExtraction).toHaveBeenCalledTimes(1);
      expect(Mock.ExtractionRestService.disableExtraction).toHaveBeenCalledWith(Mock.USER_DISABLE);
      Mock.ExtractionRestService.disableExtraction().then(function(params) {
        expect(controller.updateUsers).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('should call enableDisable method enable', function () {
    controller.$onInit();
    controller.enableDisable(Mock.USER_ENABLE);
    Mock.$mdDialog.show().then(function() {
      expect(Mock.UserManager.enable).toHaveBeenCalledTimes(1);
      expect(Mock.UserManager.enable).toHaveBeenCalledWith(Mock.USER_ENABLE);
      expect(Mock.UserManager.disable).toHaveBeenCalledTimes(0);
      Mock.UserManager.enable().then(function(params) {
        expect(controller.updateUsers).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('should call enableDisable method disable', function () {
    controller.$onInit();
    controller.enableDisable(Mock.USER_DISABLE);
    Mock.$mdDialog.show().then(function() {
      expect(Mock.UserManager.enable).toHaveBeenCalledTimes(0);
      expect(Mock.UserManager.disable).toHaveBeenCalledTimes(1);
      Mock.UserManager.disable().then(function(params) {
        expect(controller.updateUsers).toHaveBeenCalledTimes(1);
      });
    });
  });

  it('should call updateFieldCenter method', function() {
    controller.$onInit();
    controller.updateFieldCenter(Mock.USER_ENABLE);
    expect(Mock.UserManager.updateFieldCenter).toHaveBeenCalledTimes(1);
    expect(Mock.UserManager.updateFieldCenter).toHaveBeenCalledWith(Mock.USER_ENABLE);
    Mock.UserManager.updateFieldCenter().then(function(params) {
      expect(controller.updateUsers).toHaveBeenCalledTimes(1);
    });
  });

  function mockData() {
    Mock.USER_ENABLE = {
      enable: true,
      extraction: true
    };

    Mock.USER_DISABLE = {
      enable: false,
      extraction: false
    }
  }

  function mockInjections() {
    Mock.$mdDialog = {
      show: function () {
        return Promise.resolve()
      },
      confirm: function () {
        var self = this;

        self.title = function (msg) {
          var vm = this;
          vm.msg = msg;
          return vm;
        };

        self.textContent = function (msg) {
          var vm = this;
          vm.msg = msg;
          return vm;
        };

        self.ok = function (p) {
          var vm = this;
          vm.p = p;
          return vm;
        };

        self.cancel = function (time) {
          var vm = this;
          vm.time = time;
          return vm;
        };

        return self;
      }
    };

    Mock.ExtractionRestService = {
      enableExtraction: () => {
        return Promise.resolve()
      },
      disableExtraction: () => {
        return Promise.resolve()
      },
    }

    Mock.fieldCenterResource = {
      getAll: function (params) {
        return Promise.resolve();
      }
    }

    Mock.OtusRestResourceService = {
      getUserResource: () => {
        return Promise.resolve()
      },
      getOtusFieldCenterResource: () => {
        return Mock.fieldCenterResource
      },
    }

    Mock.$mdToast = {
      show: () => {},
      simple: function() {
        var self = this;

        self.textContent = function (msg) {
          var vm = this;
          vm.msg = msg;
          return vm;
        };

        self.hideDelay = function (p) {
          var vm = this;
          vm.p = p;
          return vm;
        };

        return self;
        }

    };

    Mock.UserManager = {
      updateFieldCenter: () => {
        return Promise.resolve()
      },
      enable: () => {
        return Promise.resolve()
      },
      disable: () => {
        return Promise.resolve()
      }
    };

    Mock.UserManagerFactory = {
      create: () => {
        return Mock.UserManager;
        }
      }
    }

});