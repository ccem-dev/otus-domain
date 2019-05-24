describe('Permission Service Tests', function () {
  var Mock = {};
  var service;
  var Injections = {};
  var EMAIL = "otus@solutions.com";

  beforeEach(function () {
    mockDependencies();
    mockPermissionList();
    mockPermissionManager();

    angular.mock.module('otusDomain.project', function ($provide) {
      $provide.value('otusjs.user.permission.PermissionManagerFactory', Mock.PermissionManagerFactory);
      $provide.value('otusjs.user.permission.SurveyGroupPermissionFactory', {});
      $provide.value('PermissionRestService', Mock.PermissionRestService);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      mockInjections(_$injector_);
      Injections = {
        'PermissionRestService': _$injector_.get('PermissionRestService'),
        'otusjs.user.permission.PermissionManagerFactory': Mock.PermissionManagerFactory,
        '$q': _$injector_.get('$q')
      };

      service = _$injector_.get('ProjectPermissionService', Injections);
      spyOn(Mock.PermissionRestService, "getAll").and.returnValue(Promise.resolve(Mock.permissionListResponse));
      spyOn(Mock.PermissionManagerFactory, "create").and.returnValue(Mock.permissionManager);
      spyOn(Mock.PermissionRestService, "savePermission").and.callThrough();
      spyOn(Mock.permissionManager, "findByType").and.callThrough();
    });
  });

  it('should defined methods', function () {
    expect(service.fetchPermissions).toBeDefined();
    expect(service.savePermission).toBeDefined();
  });

  it('should call getAll method', function () {
    service.fetchPermissions();
    expect(Mock.PermissionRestService.getAll).toHaveBeenCalledTimes(1)
  });

  it('should call savePermission method', function () {
    service.savePermission(Mock.permission);
    expect(Mock.PermissionRestService.savePermission).toHaveBeenCalledTimes(1)
  });

  it('should call the permission manager factory', function () {
    service.fetchPermissions(EMAIL).then(function () {
      expect(Mock.PermissionManagerFactory.create).toHaveBeenCalledTimes(1);
    });
  });

  it('should call the permission manager find by type', function () {
    service.fetchPermissions(EMAIL).then(function () {
      service.getPermissionByType("LaboratoryPermission");
      expect(Mock.permissionManager).toHaveBeenCalledWith("LaboratoryPermission")
    });
  });

  function mockDependencies() {
    Mock.PermissionRestService = {
      getAll: function () {
        return Promise.resolve({data: {permissions: []}});
      },
      savePermission: function () {
        return Promise.resolve({});
      }
    };

    Mock.PermissionManagerFactory = {
      create: function () {
        return {};
      }
    };

    Mock.permission = {
      toJSON: () => {
      }
    };

  }

  function mockInjections(_$injector_) {
    Mock.PermissionManagerFactory = _$injector_.get('otusjs.user.permission.PermissionManagerFactory');

  }

  function mockPermissionList() {
    Mock.permissionListResponse = {
      data: {
        permissions: [
          {
            objectType: "Laboratory",
            email: EMAIL,
            access: false
          },
          {
            objectType: "SurveyGroupPermission",
            email: EMAIL,
            groups: []
          }
        ]
      }
    }
  }

  function mockPermissionManager() {
    Mock.permissionManager = {
      findByType: function () {

      }
    };
  }
});