describe("Activity Settings Component Test", function () {
  var Mock = {};
  var controller;
  var CHIP = {
    "name": "Fulano",
    "email": "fulano@gmail.com"
  };
  var NEW_CHIP = {
    "name": "Fulano",
    "type": "new"
  };


  mockValues();
  mockInjections();
  beforeEach(function () {
    angular.mock.module("otusDomain.dashboard", function ($provide) {
      $provide.value("otusjs.otus-domain.project.configuration.ProjectConfigurationService", Mock.ProjectConfigurationService)
      $provide.value("$mdToast",Mock.mdToast)
      $provide.value("ActivityConfigurationManagerService", Mock.ActivityConfigurationManagerService)
      $provide.value('otusjs.model.activity.ActivityPermissionFactory', Mock.ActivityPermissionFactory);
    });

    inject(function (_$controller_) {
      controller = _$controller_("activitySettingsCtrl");
    });

    spyOn(Mock.ActivityConfigurationManagerService, "getSurveyToSettings").and.returnValue(Mock.permission);
    spyOn(Mock.ProjectConfigurationService, "fetchUsers").and.callThrough();
    spyOn(Mock.mdToast, "show").and.callThrough();

    controller.$onInit();

  });

  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should list users', function (done) {
    Mock.ProjectConfigurationService.fetchUsers().then(function () {
      expect(controller.permission).toBeDefined();
      expect(controller.AllUsers).toBeDefined();
      expect(controller.users.length).toEqual(1);
      setTimeout(function () {
        done();
      },200);
    });
    done();
  });

  it('should add user on update', function (done) {
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.resolve({}));
    controller.onAdd({email: "beltrano@gmail.com"});
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
        expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      },200);
    });
    done();
  });

  it('should not add user on update', function (done) {
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.reject());
    controller.onAdd({email: "beltrano@gmail.com"});
    expect(Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
    }).catch(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      },200);
    });
    done();
  });

  it('should add user on create', function (done) {
    controller.permission._id = null;
    spyOn(Mock.ProjectConfigurationService, "setUsersExclusiveDisjunction").and.returnValue(Promise.resolve({}));
    spyOn(Mock.ActivityPermissionFactory, "fromJsonObject").and.callThrough();
    spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.returnValue(Promise.resolve([
      {
        "_id": "5bb3d272cc5fe80077b11615",
        "objectType": "ActivityAccessPermission",
        "version": 2,
        "acronym": "OTUS",
        "exclusiveDisjunction": [
          "pedro.silva@gmail.com"
        ]
      },
      {
        "_id": "5bb3d8ebcc5fe80077b11616",
        "objectType": "ActivityAccessPermission",
        "version": 2,
        "acronym": "CSJ",
        "exclusiveDisjunction": [
          "pedro.silva@gmail.com"
        ]
      }
    ]));
    controller.onAdd({email: "beltrano@gmail.com"});
    expect(Mock.ProjectConfigurationService.setUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.setUsersExclusiveDisjunction().then(function () {
      Mock.ProjectConfigurationService.getCollectionOfPermissions().then(function () {
        expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
        expect(Mock.ActivityPermissionFactory.fromJsonObject).toHaveBeenCalledTimes(1);
        setTimeout(function () {
          done();
        },100);
      })
    });
    done();
  });

  it('should not add user on create', function (done) {
    controller.permission._id = null;
    spyOn(Mock.ProjectConfigurationService, "setUsersExclusiveDisjunction").and.returnValue(Promise.reject());
    controller.onAdd({email: "beltrano@gmail.com"});
    expect(Mock.ProjectConfigurationService.setUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.setUsersExclusiveDisjunction().then(function () {
    }).catch(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      },200);
    });
    done();
  });

  it('should remove user on update', function (done) {
    controller.permission._id = "5bb3d272cc5fe80077b11615";
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.resolve({}));
    controller.onRemove({email: "fulano@gmail.com"});
    expect(Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      },200);
    });
    done();
  });

  it('should not remove user on update', function (done) {
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.reject());
    controller.onRemove({email: "beltrano@gmail.com"});
    expect(Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
    }).catch(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      },200);
    });
    done();
  });

  it('should transformChip when found user', function () {
    controller.querySearch("F");
    expect(controller.transformChip(CHIP)).toEqual(CHIP);
    expect(controller.transformChip("Fulano")).toEqual(NEW_CHIP);
  });


  function mockInjections() {

    Mock.ActivityConfigurationManagerService = {
      setSurveyToSettings: function () {},
      getSurveyToSettings: function () {}
    }

    Mock.ProjectConfigurationService = {
      fetchUsers: function() {
        return Promise.resolve([
          {
            "name": "Fulano",
            "email": "fulano@gmail.com",
          },
          {
            "name": "Ciclano",
            "email": "ciclano@hotmail.com",
           }
        ]);
      },
      setUsersExclusiveDisjunction: function () {
        return Promise.resolve();
      },
      updateUsersExclusiveDisjunction: function () {
        return Promise.resolve([]);
      },
      getCollectionOfPermissions: function () {
        return Promise.resolve();
      }
    };

    Mock.mdToast = {
      show: function(){},
      simple: function(){
        var self = this;
        self.title = function () {
          return self;
        };
        self.textContent = function () {
          return self;
        };
        self.position = function () {
          return self;
        };
        self.hideDelay = function () {
          return self;
        };
        return self;
      }
    }
  }

  function mockValues() {
    Mock.permission = {
      "_id": "5bb3d272cc5fe80077b11615",
      "objectType": "ActivityAccessPermission",
      "version": 2,
      "acronym": "OTUS",
      addUser: function(){},
      removeUser: function(){},
      "exclusiveDisjunction": [
        "fulano@gmail.com"
      ]
    };

    Mock.ActivityPermissionFactory= {
      create: function() {},
      fromJsonObject: function(obj) {
        return{
          _id: null,
          objectType: "ActivityPermission",
          acronym: obj.acronym,
          version: obj.version,
          exclusiveDisjunction: [],
        }
      }
    };
  }
});