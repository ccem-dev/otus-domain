describe('User Manager Factory Tests', function () {
  var Mock = {};
  var factory;
  var UserManager;

  beforeEach(function () {
    angular.mock.module('otusDomain.project');
    mockData();
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      factory = _$injector_.get("UserManagerFactory");
    });

    UserManager = factory.create(Mock.resource);
    spyOn(Mock.resource, "enable").and.callThrough();
    spyOn(Mock.resource, "disable").and.callThrough();
    spyOn(Mock.resource, "list").and.callThrough();
    spyOn(Mock.resource, "updateFieldCenter").and.callThrough();
  });

  it('should defined methods', function () {
    expect(UserManager.enable).toBeDefined();
    expect(UserManager.disable).toBeDefined();
    expect(UserManager.list).toBeDefined();
    expect(UserManager.updateFieldCenter).toBeDefined();
  });

  it('should call enable method', function () {
    UserManager.enable();
    expect(Mock.resource.enable).toHaveBeenCalledTimes(1);
  });

  it('should call disable method', function () {
    UserManager.disable();
    expect(Mock.resource.disable).toHaveBeenCalledTimes(1);
  });

  it('should call list method', function () {
    UserManager.list();
    expect(Mock.resource.list).toHaveBeenCalledTimes(1);
  });

  it('should call updateFieldCenter method', function () {
    UserManager.updateFieldCenter();
    expect(Mock.resource.updateFieldCenter).toHaveBeenCalledTimes(1);
  });


  function mockData() {
    Mock.resource = {
      enable: function () {
        return {
          $promise: {}
        }
      },
      disable: function () {
        return {
          $promise: {}
        }
      },
      list: function () {
        return {
          $promise: {}
        }
      },
      updateFieldCenter: function () {
        return {
          $promise: {}
        }
      }
    }
  }
});