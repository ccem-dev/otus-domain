describe('Otus User Dashboard Component Tests', function () {
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

      controller.allUsers = Mock.users;
    });

    spyOn(Injections.UserManagerFactory, "create").and.returnValue(Mock.UserManager);
    spyOn(Mock.OtusRestResourceService, "getUserResource").and.callThrough();
    spyOn(Mock.OtusRestResourceService, "getOtusFieldCenterResource").and.callThrough();
    spyOn(Mock.UserManager, "list").and.callThrough();
    spyOn(angular, "element").and.callThrough();
    spyOn(angular, "copy").and.callThrough();
    spyOn(controller, "searchUser").and.callThrough();
    spyOn(controller, "filterUsers").and.callThrough();
    spyOn(controller, "filterUsersActives").and.callThrough();
    spyOn(controller, "filterUsersExtraction").and.callThrough();
    spyOn(controller, "filterUsersCenter").and.callThrough();
  });

  it('should controller defined', function() {
    expect(controller).toBeDefined();
    expect(controller.users).toBeDefined();
    expect(controller.fieldCenters).toBeDefined();
    expect(controller.activeUsers).toBeTruthy();
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
    expect(Injections.UserManagerFactory.create).toHaveBeenCalledBefore(Mock.UserManager.list);
    expect(Mock.UserManager.list).toHaveBeenCalledTimes(1);

    Mock.UserManager.list().then(function () {
      expect(controller.allUsers).toBeDefined();
      expect(angular.element).toHaveBeenCalledTimes(1);
      expect(controller.filterUsers).toHaveBeenCalledBefore(controller.filterUsersActives);
      expect(controller.filterUsersActives).toHaveBeenCalledBefore(controller.filterUsersCenter);
      expect(controller.filterUsersCenter).toHaveBeenCalledBefore(controller.filterUsersExtraction);
      done();
    });
    done();
  });

  it('should return all users', function () {
    controller.$onInit();
    controller.activeUsers = false;
    controller.extractionUsers = false;
    controller.selectCenter = undefined;
    controller.filterUsers();
    expect(angular.copy).toHaveBeenCalledTimes(2);
    expect(controller.filterUsersActives).toHaveBeenCalledTimes(1);
  });

  it('should return all users actives', function () {
    controller.$onInit();
    controller.activeUsers = true;
    controller.extractionUsers = false;
    controller.selectCenter = undefined;
    controller.filterUsers();
    expect(angular.copy).toHaveBeenCalledTimes(1);
    expect(controller.filterUsersActives).toHaveBeenCalledTimes(1);
    expect(controller.users).toEqual([Mock.users[0], Mock.users[2]]);
  });

  it('should return all users extraction', function () {
    controller.$onInit();
    controller.activeUsers = false;
    controller.extractionUsers = true;
    controller.selectCenter = undefined;
    controller.filterUsers();
    expect(angular.copy).toHaveBeenCalledTimes(2);
    expect(controller.filterUsersActives).toHaveBeenCalledTimes(1);
    expect(controller.users).toEqual([Mock.users[0], Mock.users[1]]);
  });

  it('should return all users by center', function () {
    controller.$onInit();
    controller.activeUsers = false;
    controller.extractionUsers = false;
    controller.userCenter = "RS";
    controller.fieldCenters = Mock.fieldCenters;
    controller.filterUsers();
    expect(angular.copy).toHaveBeenCalledTimes(3);
    expect(controller.filterUsersActives).toHaveBeenCalledTimes(1);
    expect(controller.users).toEqual([Mock.users[0]]);
  });

  it('should select a user', function () {
    controller.$onInit();
    controller.selectedUserChange("otus");
    expect(controller.selectedUser).toEqual("otus");
    controller.selectedUserChange();
    expect(controller.selectedUser).toBeUndefined();
    expect(controller.managerUserPermission).toBeUndefined();
  });

  it('should search users', function () {
    controller.$onInit();
    controller.users = Mock.users;
    expect(controller.searchUser("Otus")).toEqual([Mock.users[0]]);
    expect(controller.searchUser("Mendes")).toEqual([Mock.users[1]]);
    expect(controller.searchUser("otavio@nadal")).toEqual([Mock.users[2]]);
    expect(controller.searchUser("n")).toEqual(Mock.users);
    expect(controller.searchUser(null)).toEqual(Mock.users);
    expect(controller.searchUser("ot")).toEqual([Mock.users[0],Mock.users[2]]);
  });

  it('should update users method', function () {
    controller.$onInit();
    controller.updateUsers();
    Mock.UserManager.list().then(function () {

      expect(controller.filterUsersActives).toHaveBeenCalled();
      expect(controller.filterUsersExtraction).toHaveBeenCalled();
      expect(controller.filterUsersCenter).toHaveBeenCalled();
    })
  });

  function mockData() {
    Mock.fieldCenters = [
      {acronym: "RS"},
      {acronym: "MG"},
      {acronym: "SP"},
    ];
    Mock.fieldCenterResource = {
      getAll: function () {
        return {data: Mock.fieldCenters};
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
        return Promise.resolve({data:[]});
      }
    };

    Mock.users = [
      {
        name: "Otus",
        surname: "Solutions",
        email: "otus@solutions.com",
        enable: true,
        extraction: true,
        fieldCenter:{
          acronym: "RS"
        }
      },
      {
        name: "Maria",
        surname: "Mendes",
        email: "maria@mendes.com",
        enable: false,
        extraction: true,
        fieldCenter:{
          acronym: "MG"
        }
      },
      {
        name: "Otavio",
        surname: "Nadal",
        email: "otavio@nadal.com",
        enable: true,
        extraction: false,
        fieldCenter:{
          acronym: "SP"
        }
      }
    ];
  }
});