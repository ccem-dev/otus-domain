describe("Activity Settings Component Test", function () {
  var Mock = {};
  var controller;
  const CHIP = {
    "name": "Fulano",
    "email": "fulano@gmail.com"
  };
  const NEW_CHIP = {
    "name": "Fulano",
    "type": "new"
  };

  mockValues();
  mockInjections();
  beforeEach(function () {
    angular.mock.module("otusDomain.dashboard", function ($provide) {
      $provide.value("$mdToast", Mock.mdToast);
      $provide.value('otusDomain.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value("ActivityConfigurationManagerService", Mock.ActivityConfigurationManagerService);
      $provide.value('otusjs.model.activity.ActivityPermissionFactory', Mock.ActivityPermissionFactory);
      $provide.value('SurveyFactory', Mock.SurveyFactory);
      $provide.value("otusDomain.rest.configuration.ProjectConfigurationService", Mock.ProjectConfigurationService);
      $provide.value('otusDomain.dashboard.business.SurveyTemplateTranslateService', Mock.SurveyTemplateTranslateService);
      $provide.value('$mdDialog', Mock.mdDialog);
      $provide.value('$mdSelect', Mock.mdSelect);
      $provide.value('ActivitySettingsService', Mock.ActivitySettingsService);
      $provide.value('ActivityReportDialogService', Mock.ActivityReportDialogService);
    });

    inject(function (_$controller_) {
      controller = _$controller_("activitySettingsCtrl");
    });

    spyOn(Mock.ActivityConfigurationManagerService, "getSurveyOfContext").and.returnValue(Mock.surveyTemplate);
    spyOn(Mock.ActivityConfigurationManagerService, "getPermissionOfContext").and.returnValue(Mock.permission);
    spyOn(Mock.ProjectConfigurationService, "fetchUsers").and.callThrough();
    spyOn(Mock.mdToast, "show").and.callThrough();

    controller.$onInit();
  });

  var originalTimeout;
  beforeEach(function () {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should list users', function (done) {
    Mock.ProjectConfigurationService.fetchUsers().then(function () {
      expect(controller.permission).toBeDefined();
      expect(controller.AllUsers).toBeDefined();
      expect(controller.users.length).toEqual(1);
      setTimeout(function () {
        done();
      }, 200);
    });
    done();
  });

  it('should add user on update', function (done) {
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.resolve({}));
    controller.onAdd({ email: "beltrano@gmail.com" });
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      }, 200);
    });
    done();
  });

  it('should not add user on update', function (done) {
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.reject());
    controller.onAdd({ email: "beltrano@gmail.com" });
    expect(Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
    }).catch(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      }, 200);
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
    controller.onAdd({ email: "beltrano@gmail.com" });
    expect(Mock.ProjectConfigurationService.setUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.setUsersExclusiveDisjunction().then(function () {
      Mock.ProjectConfigurationService.getCollectionOfPermissions().then(function () {
        expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
        expect(Mock.ActivityPermissionFactory.fromJsonObject).toHaveBeenCalledTimes(1);
        setTimeout(function () {
          done();
        }, 100);
      })
    });
    done();
  });

  it('should not add user on create', function (done) {
    controller.permission._id = null;
    spyOn(Mock.ProjectConfigurationService, "setUsersExclusiveDisjunction").and.returnValue(Promise.reject());
    controller.onAdd({ email: "beltrano@gmail.com" });
    expect(Mock.ProjectConfigurationService.setUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.setUsersExclusiveDisjunction().then(function () {
    }).catch(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      }, 200);
    });
    done();
  });

  it('should remove user on update', function (done) {
    controller.permission._id = "5bb3d272cc5fe80077b11615";
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.resolve({}));
    controller.onRemove({ email: "fulano@gmail.com" });
    expect(Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      }, 200);
    });
    done();
  });

  it('should not remove user on update', function (done) {
    spyOn(Mock.ProjectConfigurationService, "updateUsersExclusiveDisjunction").and.returnValue(Promise.reject());
    controller.onRemove({ email: "beltrano@gmail.com" });
    expect(Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction).toHaveBeenCalledTimes(1);
    Mock.ProjectConfigurationService.updateUsersExclusiveDisjunction().then(function () {
    }).catch(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      }, 200);
    });
    done();
  });

  it('should transformChip when found user', function () {
    controller.querySearch("F");
    expect(controller.transformChip(CHIP)).toEqual(CHIP);
    expect(controller.transformChip("Fulano")).toEqual(NEW_CHIP);
  });

  describe('downloadTemplate method', function () {
    it('should to be defined', function () {
      expect(controller.downloadTemplate).toBeDefined();
    });
  });

  describe('downloadVariables method', function () {
    it('should to be defined', function () {
      expect(controller.downloadVariables).toBeDefined();
    });
  });

  it('isRequiredExternalIDmethod should add user on update', function (done) {
    spyOn(Mock.ProjectConfigurationService, "updateSurveyRequiredExternalID").and.returnValue(Promise.resolve({}));
    controller.isRequiredExternalID();
    expect(controller.externalID).toBeTruthy();
    Mock.ProjectConfigurationService.updateSurveyRequiredExternalID().then(function () {
      expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
      setTimeout(function () {
        done();
      }, 200);
    });
    done();
  });

  function mockInjections() {

    Mock.ActivityConfigurationManagerService = {
      setSurveyInContext: function () { },
      getSurveyOfContext: function () { },
      getPermissionOfContext: function () { },
      setPermissionInContext: function () { }
    }

    Mock.ProjectConfigurationService = {
      fetchUsers: function () {
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
      },
      getSurveyVersions: function () {
        return Promise.resolve();
      },
      getSurveyTemplatesByAcronym: function () {
        return Promise.resolve();
      },
      getActivityReports: function(){
        return Promise.resolve()
      },
      updateSurveyRequiredExternalID: () => {
        return Promise.resolve({});
      }
    };

    Mock.LoadingScreenService = {
      start: function () {
        return Promise.resolve();
      },
      finish: function () {
        return Promise.resolve();
      }
    };

    Mock.mdToast = {
      show: function () { },
      simple: function () {
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
    },

    Mock.mdDialog = {
      confirm: () => {}
    }

    Mock.mdSelect = {
      destroy: () => {},
      cancel: () => {}
    }

    Mock.ActivitySettingsService = {
      getActivityReports: () => {
        return []
      }
    }

    Mock.ActivityReportDialogService = {
      loadActivityReport: () => {}
    }
  }

  function mockValues() {
    Mock.surveyTemplatesList = [{
      'sender': "test@test.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "FORM_INTERVIEW",
      'version': 1,
      'isDiscarded': false,
      'requiredExternalID': false,
      'surveyTemplate': {
        'identity': {
          'name': 'DIARIO DE SONO',
          'acronym': 'DSO',
        }
      }
    }];

    Mock.surveyTemplate = {
      'sender': "test@test.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "FORM_INTERVIEW",
      'version': 1,
      'isDiscarded': false,
      'requiredExternalID': false,
      'surveyTemplate': {
        'identity': {
          'name': 'DIARIO DE SONO',
          'acronym': 'DSO',
        }
      }
    };

    Mock.permission = {
      "_id": "5bb3d272cc5fe80077b11615",
      "objectType": "ActivityAccessPermission",
      "version": 2,
      "acronym": "OTUS",
      addUser: function () { },
      removeUser: function () { },
      "exclusiveDisjunction": [
        "fulano@gmail.com"
      ]
    };

    Mock.ActivityPermissionFactory = {
      create: function () { },
      fromJsonObject: function (obj) {
        return {
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
