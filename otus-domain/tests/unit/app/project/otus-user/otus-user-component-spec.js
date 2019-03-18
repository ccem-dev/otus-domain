fdescribe('Otus User Component Tests', function () {
  var Mock = {};
  var controller, scope;
  var Injections;

  beforeEach(function () {
    mockData();
    angular.mock.module('otusDomain.project', function($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
      $provide.value('$scope', {});
    });
  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_, _$rootScope_) {
      Injections = {
        'OtusRestResourceService': _$injector_.get('OtusRestResourceService'),
        'UserManagerFactory': _$injector_.get('UserManagerFactory'),
        '$compile': _$injector_.get('$compile')
      };
      scope = _$rootScope_.$new();
      Injections.$scope = scope;
      controller = _$controller_('otusUserCtrl', Injections);


    });

    spyOn(Injections.UserManagerFactory, "create").and.returnValue(Mock.UserManager)
    spyOn(Mock.OtusRestResourceService, "getUserResource").and.callThrough();
    spyOn(Mock.OtusRestResourceService, "getOtusFieldCenterResource").and.callThrough();
    spyOn(Mock.UserManager, "list").and.callThrough();
    Injections.$scope = scope.$new();
  });

  it('should controller defined', function() {
    expect(controller).toBeDefined();
    expect(controller.users).toBeDefined();
    expect(controller.fieldCenters).toBeDefined();
    expect(controller.activeUsers).toBeTruthy()
    expect(controller.extractionUsers).toBeFalsy();
    expect(controller.userCenter).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.selectedUserChange).toBeDefined();
    expect(controller.searchUser).toBeDefined();
    expect(controller.filterUsersActives).toBeDefined();
    expect(controller.filterUsersExtraction).toBeDefined();
    expect(controller.filterUsersCenter).toBeDefined();
    expect(controller.filterUsers).toBeDefined();
    expect(controller.updateUsers).toBeDefined();
  });

  it('should call onInit method', function (done) {
    controller.$onInit();
    expect(Mock.OtusRestResourceService.getUserResource).toHaveBeenCalledTimes(1);
    expect(Mock.OtusRestResourceService.getOtusFieldCenterResource).toHaveBeenCalledTimes(1);
    expect(Mock.OtusRestResourceService.getUserResource).toHaveBeenCalledBefore(Mock.OtusRestResourceService.getOtusFieldCenterResource);
    expect(Injections.UserManagerFactory.create).toHaveBeenCalledTimes(1);
    expect(Mock.UserManager.list).toHaveBeenCalledTimes(1);

    Mock.UserManager.list().then(function () {
      expect(controller.allUsers).toBeDefined();
      done();
    });
    done();
  });


  function mockData() {
    Mock.fieldCenterResource = {
      getAll: function (params) {
        return Promise.resolve({data:[]});
      }
    };

    Mock.OtusRestResourceService = {
      getUserResource: () => {
        return Promise.resolve()
      },
      getOtusFieldCenterResource: () => {
        return Mock.fieldCenterResource
      },
    };

    Mock.UserManager = {
      list: function() {
        return Promise.resolve({data:[]})
      }
    };
  }
});