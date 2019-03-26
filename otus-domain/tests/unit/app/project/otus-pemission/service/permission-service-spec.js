describe('Permission Service Tests', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    mockInjections()
    angular.mock.module('otusDomain.project', function ($provide) {
      $provide.value('otusjs.user.permission.PermissionManagerFactory', Mock.PermissionManagerFactory);
      $provide.value('otusjs.user.permission.SurveyGroupPermissionFactory', {});
      $provide.value('PermissionRestService', Mock.PermissionRestService);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      Injections = {
        'PermissionRestService' : _$injector_.get('PermissionRestService'),
        'otusjs.user.permission.PermissionManagerFactory' : _$injector_.get('otusjs.user.permission.PermissionManagerFactory'),
        '$q' : _$injector_.get('$q')
      };

      service = _$injector_.get('ProjectPermissionService', Injections);
      spyOn(Mock.PermissionRestService, "getAll").and.callThrough();
      spyOn(Mock.PermissionRestService, "savePermission").and.callThrough();
    });
  });

  it('should defined methods', function () {
    expect(service.getAll).toBeDefined();
    expect(service.savePermission).toBeDefined();
  });

  it('should call getAll method', function () {
    service.getAll();
    expect(Mock.PermissionRestService.getAll).toHaveBeenCalledTimes(1)
  });

  it('should call savePermission method', function () {
    service.savePermission(Mock.permission);
    expect(Mock.PermissionRestService.savePermission).toHaveBeenCalledTimes(1)
  });

  function mockInjections() {
    Mock.PermissionRestService = {
      getAll : function(){
        return Promise.resolve({data:{permissions:[]}});
      },
      savePermission : function () {
        return Promise.resolve({});
      }
    };

    Mock.PermissionManagerFactory = {
      create: function () {
        return {};
      }
    };

    Mock.permission = {
      toJSON: () => {}
    };
  }
});