describe('participant registration', function () {
  var Mock = {};

  var $controller,
    $injector,
    $mdToast,
    $q,
    ctrl,
    scope,
    $rootScope,
    deferred,
    $compile,
    response;

  mockResponse();
  beforeEach(angular.mock.module('otusDomain.project.configuration'));
  beforeEach(angular.mock.module(function ($provide) {
    $provide.value('OtusRestResourceService', {
      getConfigurationResource: function () { return {} },
      getProjectConfigurationResource: function () { return {} }
    });
    $provide.value("$mdDialog", Mock.mdDialog);
    $provide.value("$mdToast", Mock.mdToast);
    $provide.value('otusjs.otus-domain.project.configuration.ProjectConfigurationService', Mock.ProjectConfigurationService);
  }));
  beforeEach(inject(function (_$controller_, _$q_, _$rootScope_, _$mdToast_, _$injector_, _$compile_) {
    $controller = _$controller_;
    $mdToast = _$mdToast_;
    $q = _$q_;
    scope = _$rootScope_.$new();
    $compile = _$compile_;
    var Bindings = {
    };
    $injector = _$injector_;
    var Injections = {
      '$q': $q,
      '$mdDialog': mockDialog($injector)
    };

    ctrl = $controller('otusParticipantRegistrationCtrl', Injections, Bindings);


  }));

  describe('method onInit successfull', function () {
    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, 'getProjectConfiguration').and.returnValue(Promise.resolve(Mock.projectConfiguration.data));
    });

    it('should return project configuration', function (done) {
      ctrl.$onInit();
      Mock.ProjectConfigurationService.getProjectConfiguration()
        .then(function () {
          setTimeout(function () {
            expect(ctrl.participantRegistration).toEqual(true);
            done()
          }, 100)
        }).catch(function () {
        done()
      });
    });
  });

  describe('method onInit failed', function(){
    beforeEach(function () {
      spyOn(Mock.ProjectConfigurationService, 'getProjectConfiguration').and.returnValue(Promise.reject());
      spyOn(Mock.mdToast, "show").and.callThrough();
    });
    it('should not return project configuration', function (done) {
      ctrl.$onInit();
      deferred = $q.defer();
      Mock.ProjectConfigurationService.getProjectConfiguration()
        .then(function () {
          done();
        }).catch(function () {
        setTimeout(function () {
          expect(ctrl.error).toEqual(true);
          done();
        },100);
      });
    });
  });

  describe('method setAllowNewParticipants enable', function(){
    beforeEach(function () {
      spyOn(Mock.mdToast, "show").and.callThrough();
    });

    it('should enable allow new participants', function (done) {
      spyOn(Mock.ProjectConfigurationService, 'allowNewParticipants').and.returnValue(Promise.resolve());
      ctrl.participantRegistration = true;
      ctrl.setAllowNewParticipants();
      Mock.ProjectConfigurationService.allowNewParticipants().then(function () {
        setTimeout(function () {
          expect(ctrl.participantRegistration).toEqual(true);
          expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
          done();
        })
      })
    });

    it('should not enable allow new participants', function (done) {
      spyOn(Mock.ProjectConfigurationService, 'allowNewParticipants').and.returnValue(Promise.reject());
      ctrl.participantRegistration = true;
      ctrl.setAllowNewParticipants();
      Mock.ProjectConfigurationService.allowNewParticipants().then(function () {
        }).catch(function () {
        setTimeout(function () {
          expect(ctrl.participantRegistration).toEqual(true);
          expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
          done();
      })
      })
    });

  });

  describe('method setAllowNewParticipants disable', function(){
    beforeEach(function () {
      spyOn(Mock.mdToast, "show").and.callThrough();
    });

    it('should disable allow new participants', function (done) {
      spyOn(Mock.ProjectConfigurationService, 'allowNewParticipants').and.returnValue(Promise.resolve());
      ctrl.participantRegistration = false;
      ctrl.setAllowNewParticipants();
      Mock.ProjectConfigurationService.allowNewParticipants().then(function () {
        setTimeout(function () {
          expect(ctrl.participantRegistration).toEqual(false);
          expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
          done();
        })
      })
    });

    it('should not disable allow new participants', function (done) {
      spyOn(Mock.ProjectConfigurationService, 'allowNewParticipants').and.returnValue(Promise.reject());
      ctrl.participantRegistration = false;
      ctrl.setAllowNewParticipants();
      Mock.ProjectConfigurationService.allowNewParticipants().then(function () {
      }).catch(function () {
        setTimeout(function () {
          expect(ctrl.participantRegistration).toEqual(false);
          expect(Mock.mdToast.show).toHaveBeenCalledTimes(1);
          done();
        })
      })
    });

  });






  function mockDialog($injector) {
    Mock.mdDialog = $injector.get('$mdDialog');
    return Mock.mdDialog;
  }

  function mockResponse() {
    Mock.ProjectConfigurationService = {
      allowNewParticipants:function(){
        return Promise.resolve();
      },
      getProjectConfiguration:function () {
        return Promise.resolve()
      }
    }

    Mock.projectConfiguration = {
      "data": {
        "objectType": "ProjectConfiguration",
        "participantRegistration": true
      }
    };
    Mock.allowNewParticipants = { "data": true }

    Mock.surveyList = [{
      'sender': "brenoscheffer@gmail.com",
      'sendingDate': "Oct 6, 2016 10:56:46 PM",
      'surveyFormType': "FORM_INTERVIEW",
      'version': 2,
      'isDiscarded': false,
      'surveyTemplate': {
        'identity': {
          'name': 'COLETA JEJUM',
          'acronym': 'CSJ',
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
});