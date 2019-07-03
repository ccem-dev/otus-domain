describe('ProjectConfigurationService Test', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var originalTimeout;

  beforeEach(function () {
    mockInjections();
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    angular.mock.module('otusDomain.project.configuration', function ($provide) {
      $provide.value("OtusRestResourceService", Mock.OtusRestResourceService);
    });

    inject(function (_$injector_) {
      Injections = {
        $q: _$injector_.get('$q')
      };
      service = _$injector_.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService', Injections);
      service.initialize();
    });

    spyOn(Mock.rest, "list").and.callThrough();
    spyOn(Mock.rest, "listAll").and.callThrough();
    spyOn(Mock.OtusRestResourceService, "getConfigurationResource").and.returnValue(Mock.rest);
    spyOn(Mock.OtusRestResourceService, "getProjectConfigurationResource").and.returnValue(Mock.rest);
    spyOn(Mock.OtusRestResourceService, "getPermissionConfigurationResource").and.returnValue(Mock.rest);
    spyOn(Mock.OtusRestResourceService, "getUserResource").and.returnValue(Mock.rest);
  });

  afterEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should defined method', function () {
    expect(service.list).toBeDefined();
    expect(service.listAll).toBeDefined();
  });

  it('should call list method', function (done) {
    service.list();
    expect(Mock.rest.list).toHaveBeenCalledTimes(1);
    done()
  });

  it('should call listAll method', function (done) {
    service.listAll();
    expect(Mock.rest.listAll).toHaveBeenCalledTimes(1);
    done()
  });

  function mockInjections() {
    Mock.rest = {
      list: function () {
        return { $promise: Promise.resolve({ data: [] }) };
      },
      listAll: function () {
        return { $promise: Promise.resolve({ data: [] }) };
      }
    };
    Mock.OtusRestResourceService = {
      getSurveyResource: function () {
        return Mock.rest;
      }
    };
    Mock.$q = {
      defer: () => {
        return { promise: {}, resolve: () => { }, reject: () => { } }
      },
    }
  }

});