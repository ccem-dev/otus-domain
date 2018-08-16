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

  beforeEach(angular.mock.module('otusDomain'));
  beforeEach(angular.mock.module(function ($provide) {
    $provide.value('OtusRestResourceService', {
      getConfigurationResource: function () { return {} },
      getProjectConfigurationResource: function () { return {} }
    });
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
      'ProjectConfigurationService': mockProjectConfigurationService($injector),
      '$mdDialog': mockDialog($injector)
    };
    mockResponse();
    ctrl = $controller('otusParticipantRegistrationCtrl', Injections, Bindings);
  }));

  describe('method onInit', function () {
    beforeEach(function () {
      deferred = $q.defer();
      spyOn(Mock.ProjectConfigurationService, 'getProjectConfiguration').and.returnValue(deferred.promise);
      deferred.resolve(Mock.projectConfiguration);
      var result;
      Mock.ProjectConfigurationService.getProjectConfiguration()
        .then(function (returnFromPromise) {
          result = returnFromPromise;
          expect(result).toEqual(Mock.projectConfiguration);
        });
      scope.$apply();
    });

    it('should call method getProjectConfiguration', function () {

      ctrl.$onInit();

      expect(Mock.ProjectConfigurationService.getProjectConfiguration).toHaveBeenCalled();
    });

    it('should initialize the variable participantRegistration', function () {

      ctrl.$onInit();
      Mock.ProjectConfigurationService.getProjectConfiguration()
        .then(function () {
          expect(ctrl.participantRegistration).toEqual(true);
        });
    });
  });

  describe('method setAllowNewParticipants', function () {
    beforeEach(function () {
      deferred = $q.defer();
      spyOn(Mock.ProjectConfigurationService, 'getProjectConfiguration').and.returnValue(deferred.promise);
      spyOn(Mock.ProjectConfigurationService, 'allowNewParticipants').and.returnValue(deferred.promise);
      deferred.resolve(Mock.projectConfiguration);
      var result;
      Mock.ProjectConfigurationService.getProjectConfiguration()
        .then(function (returnFromPromise) {
          result = returnFromPromise;
          expect(result).toEqual(Mock.projectConfiguration);
        });
      scope.$apply();

      ctrl.$onInit();
    });

    it('should call method allowNewParticipants', function () {

      ctrl.setAllowNewParticipants();

      expect(Mock.ProjectConfigurationService.allowNewParticipants).toHaveBeenCalled();
    });

    it('variable participantRegistration must be false', function () {

      ctrl.setAllowNewParticipants();

      Mock.ProjectConfigurationService.getProjectConfiguration()
        .then(function () {
          expect(ctrl.participantRegistration).toEqual(false);
        });

    });
  });

  function mockProjectConfigurationService($injector) {
    Mock.ProjectConfigurationService = $injector.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService');
    return Mock.ProjectConfigurationService;
  }

  function mockDialog($injector) {
    Mock.mdDialog = $injector.get('$mdDialog');
    return Mock.mdDialog;
  }

  function mockResponse() {
    Mock.projectConfiguration = {
      "data": {
        "objectType": "ProjectConfiguration",
        "participantRegistration": true
      }
    };
    Mock.allowNewParticipants = { "data": true }
  }
});