describe('Activity Configuration Component Test', function() {
  var Mock = {};
  var controller;
  var $mdToast;
  var file;
  var $scope, $q;

  beforeEach(function() {
    mockValues();
    mockInjections();
    angular.mock.module('otusDomain.dashboard', function($provide) {
      // $provide.value('$q',Mock.$q);
      $provide.value('otusDomain.rest.configuration.ProjectConfigurationService', Mock.ProjectConfigurationService);
      $provide.value('otusDomain.LoadingScreenService', Mock.LoadingScreenService);
      $provide.value('$mdToast',Mock.mdToast);
      $provide.value('$mdDialog',Mock.mdDialog);
    });
  });

  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  beforeEach(function() {
    inject(function(_$controller_, _$q_) {
      $q = _$q_;
      Mock.Injections = {
        "$q": $q
      }
      controller = _$controller_('activityConfigurationCtrl', Mock.Injections);
    });
    spyOn(Mock.mdDialog, "confirm").and.callThrough();
    spyOn(Mock.mdToast, "show").and.callThrough();
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should component is defined', function() {
    expect(controller.publishTemplate).toBeDefined();
    expect(controller.updateSurveyFormType).toBeDefined();
    expect(controller.deleteSurveyTemplate).toBeDefined();
    expect(controller.uploadConfig).toBeDefined();
    expect(controller.uploadedObject).toBeDefined();
    expect(controller.uploadedFile).toBeDefined();
    expect(controller.disableSaving).toBeDefined();
  });

  describe('without return data', function () {

    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, "getSurveysManagerConfiguration").and.callThrough();
      spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.callThrough();
    });

    it('should initialize component without data', function () {
      controller.$onInit();
      expect(Mock.ProjectConfigurationService.getCollectionOfPermissions).toHaveBeenCalledTimes(1);
      expect(Mock.ProjectConfigurationService.getSurveysManagerConfiguration).toHaveBeenCalledTimes(1);
      expect(Mock.mdDialog.confirm).toHaveBeenCalledTimes(1);
      expect(controller.surveyTemplatesList.length).toEqual(0);
      expect(controller.permissionList.length).toEqual(0);
    });
  });

  describe('with return data empty', function () {

    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, "getSurveysManagerConfiguration").and.returnValue(Promise.resolve([]));
      spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.callThrough();
    });

    it('should initialize component without data', function () {
      controller.$onInit();
      expect(Mock.ProjectConfigurationService.getCollectionOfPermissions).toHaveBeenCalledTimes(1);
      expect(Mock.ProjectConfigurationService.getSurveysManagerConfiguration).toHaveBeenCalledTimes(1);
      expect(Mock.mdDialog.confirm).toHaveBeenCalledTimes(1);
      expect(controller.surveyTemplatesList.length).toEqual(0);
      expect(controller.permissionList.length).toEqual(0);
    });
  });

  describe('with return data', function () {
    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, "getSurveysManagerConfiguration").and.returnValue(Promise.resolve(Mock.surveyList));
      spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.callThrough();
    });

    it('should initialize component with data', function (done) {
      controller.$onInit();
      expect(Mock.ProjectConfigurationService.getCollectionOfPermissions).toHaveBeenCalledTimes(1);
      expect(Mock.ProjectConfigurationService.getSurveysManagerConfiguration).toHaveBeenCalledTimes(1);
      expect(Mock.mdDialog.confirm).toHaveBeenCalledTimes(1);
      Mock.ProjectConfigurationService.getSurveysManagerConfiguration().then(function () {
        expect(controller.surveyTemplatesList.length).toEqual(Mock.surveyList.length);
        done()
      });
      expect(controller.permissionList.length).toEqual(0);
    });
  });

  describe('the updateSurveyFormType method', function () {
    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, "getSurveysManagerConfiguration").and.returnValue(Promise.resolve(Mock.surveyList));
      spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.callThrough();

    });

    it('not should update survey', function (done) {
      spyOn(Mock.ProjectConfigurationService, "updateSurveyTemplateType").and.returnValue(Promise.reject());
      controller.$onInit();
      expect(controller.permissionList.length).toEqual(0);
      controller.surveyTemplatesList = Mock.surveyList;
      controller.updateSurveyFormType(0);
      controller.updateSurveyFormType(1);
      Mock.ProjectConfigurationService.updateSurveyTemplateType().then(function () {
        expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
        done();
      }).catch(function () {
        done();
      })
    });

    it('should update survey', function (done) {
      controller.$onInit();
      controller.surveyTemplatesList = Mock.surveyList;
      controller.updateSurveyFormType(0);
      Mock.ProjectConfigurationService.updateSurveyTemplateType().then(function () {
        expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
        done()
      });
    });
  });



  describe('method publishTemplate', function () {

    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, "getSurveysManagerConfiguration").and.returnValue(Promise.resolve(Mock.surveyList));
      spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.callThrough();
      spyOn(window, 'FileReader').and.returnValue({
        onload: function() {},
        readAsText: function() {},
        result: new File()
      });
      file = new File();
      controller.uploadConfig.callback(file);


    });

    it('should save template successfull', function (done) {
      spyOn(Mock.ProjectConfigurationService, "publishTemplate").and.callThrough();
      controller.$onInit();
      window.FileReader().onload();
      controller.publishTemplate();
      Mock.ProjectConfigurationService.publishTemplate().then(function () {
        done();
      }).catch(function () {
        done();
      });
      done();
    });

    it('should not save template', function (done) {
      spyOn(Mock.ProjectConfigurationService, "publishTemplate").and.returnValue(Promise.reject(jasmine.any(String)));
      controller.$onInit();
      window.FileReader().onload();
      controller.publishTemplate();
      done();
    });

    it('should not save template because Acronym Already Exists', function (done) {
      spyOn(Mock.ProjectConfigurationService, "publishTemplate").and.returnValue(Promise.reject('Acronym Already Exists'));
      controller.$onInit();
      controller.publishTemplate();
      done();
    });

    it('should not save template because ID Already Exists', function (done) {
      spyOn(Mock.ProjectConfigurationService, "publishTemplate").and.returnValue(Promise.reject('ID Already Exists'));
      controller.$onInit();
      controller.publishTemplate();
      done();
    });
  });

  describe('method deleteSurveyTemplate', function () {
    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, "getSurveysManagerConfiguration").and.returnValue(Promise.resolve(Mock.surveyList));
      spyOn(Mock.ProjectConfigurationService, "getCollectionOfPermissions").and.callThrough();
      spyOn(Mock.mdDialog, "show").and.returnValue(Promise.resolve())
    });

    it('should delete survey template', function (done) {
      controller.$onInit();
      controller.deleteSurveyTemplate(0);
      Mock.ProjectConfigurationService.deleteSurveyTemplate().then(function () {
        expect(controller.surveyTemplatesList.length).toEqual(3);
        setTimeout(function () {
          done();
          expect(controller.surveyTemplatesList.length).toEqual(2);
        },100);
      }).catch(function () {
        done();
      });
    });

    it('should delete survey template', function (done) {
      spyOn(Mock.ProjectConfigurationService, "deleteSurveyTemplate").and.returnValue(Promise.reject());
      controller.$onInit();
      controller.deleteSurveyTemplate(0);
      Mock.ProjectConfigurationService.deleteSurveyTemplate().then(function () {
        done();
      }).catch(function () {
        setTimeout(function () {
          done()
          expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
        },100);
      });
    });
  });

  function mockInjections() {
    Mock.LoadingScreenService = {
      start:function() {
        return Promise.resolve();
      },
      finish:function() {
        return Promise.resolve();
      }
    };
    Mock.$q = {
      defer: function() {
        return {
          promise: Promise.resolve(JSON.stringify(Mock.surveyList[0])),
          resolve: function () {
            return Promise.resolve(JSON.stringify(Mock.surveyList[0]))
          },
          reject: Promise.reject(),
          $promise: function(){
            return new Promise(function (resolve, reject) {
              reject()
            });
          }
        }
      }
    };
    Mock.ProjectConfigurationService = {
      getSurveysManagerConfiguration: function() {
        return Promise.resolve();
      },
      deleteSurveyTemplate: function() {
        return Promise.resolve();
      },
      updateSurveyTemplateType: function() {
        return Promise.resolve();
      },
      publishTemplate: function() {
        return Promise.resolve(Mock.surveyList[0]);
      },
      getCollectionOfPermissions: function() {
        return Promise.resolve();
      }
    };

    Mock.mdDialog = {
      show: function(){},
      confirm: function () {
        var self = this;
        self.title = function () {
          return self;
        };
        self.textContent = function () {
          return self;
        };
        self.ariaLabel = function () {
          return self;
        };
        self.ok = function () {
          return self;
        };
        self.cancel = function () {
          return self;
        };
        return self;
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
        self.hideDelay = function () {
          return self;
        };
        return self;
      }
    }
  }

  function mockValues() {
    Mock.surveyList = [{
      'sender': "brenoscheffer@gmail.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "FORM_INTERVIEW",
      'version': 1,
      'isDiscarded': false,
      'surveyTemplate': {
        'identity': {
          'name': 'DIARIO DE SONO',
          'acronym': 'DSO',
        }
      }
    }, {
      'sender': "brenoscheffer@gmail.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "PROFILE",
      'version': 1,
      'isDiscarded': false,
      'surveyTemplate': {
        'identity': {
          'name': 'Elegibilidade',
          'acronym': 'ELEA'
        }
      }
    }, {
      'sender': "brenoscheffer@gmail.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "FORM_INTERVIEW",
      'version': 1,
      'isDiscarded': false,
      'surveyTemplate': {
        'identity': {
          'name': 'INT',
          'acronym': 'Integração'
        }
      }
    }];


  }


  function File() {
    return [{
      lastModified: 1523559493196,
      lastModifiedDate: new Date(),
      name: 'CISE.json',
      size: 6225,
      type: "application/json",
      webekitRelativePath: "",
      onload: function(){}
      // result: true
    }];
  }
});
