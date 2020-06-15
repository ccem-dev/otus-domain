describe('Laboratory Permission Component Tests', function () {
  var Mock = {};
  var PERMISSION_NAME;
  var Injections = {};
  var controller;

  beforeEach(function () {
    mockDependencies();
    angular.mock.module('otusDomain.rest');
    angular.mock.module('otusjs');
    angular.mock.module('otusDomain.project', function ($provide) {
      $provide.value('$element', Mock.$element);
      $provide.value('$mdToast', Mock.$mdToast);
      $provide.value('OtusRestResourceService', {});
    });

  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_) {
      mockInjections(_$injector_);

      Injections = {
        '$mdToast': _$injector_.get('$mdToast'),
        'PERMISSION_LIST': _$injector_.get('PERMISSION_LIST'),
        'ProjectPermissionService': Mock.ProjectPermissionService
      };

      PERMISSION_NAME = Injections.PERMISSION_LIST.LABORATORY;
      controller = _$controller_('laboratoryPermissionController', Injections);
      spyOn(Mock.ProjectPermissionService, "savePermission").and.returnValue(Promise.resolve());
      spyOn(Mock.ProjectPermissionService, "getPermissionByType").and.returnValue(Mock.permission);
    });

  });

  it('should defined methods', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.save).toBeDefined();
  });

  it('should call $onInit method', function () {
    controller.$onInit();
    expect(Mock.ProjectPermissionService.getPermissionByType).toHaveBeenCalledWith(PERMISSION_NAME);
  });

  it('should call save method save', function () {
    controller.$onInit();
    Mock.permission.participantLaboratoryAccess = true;
    Mock.permission.sampleTransportationAccess = true;
    Mock.permission.examLotsAccess = true;
    Mock.permission.examSendingAccess = true;
    Mock.permission.unattachedLaboratoriesAccess = false;

    controller.save(Mock.permission);
    expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledWith(Mock.permission);
  })
  it('should call method isEqual', function () {
    controller.$onInit();
    controller.permission = Mock.permission;
    controller.permissionGroup = Mock.permissionGroup;
    controller.isEqual();
    expect(controller.equal).toEqual(true);
  })
  it('should call method isActive', function () {
    controller.$onInit()
    Mock.permission.participantLaboratoryAccess = true;
    Mock.permission.sampleTransportationAccess = true;
    Mock.permission.examLotsAccess = true;
    Mock.permission.examSendingAccess = true;
    Mock.permission.unattachedLaboratoriesAccess = true;
    controller.permission = Mock.permission;
    controller.isActive();
    expect(controller.active).toEqual(true)
  })

  it('should call method activeAll', function () {
    controller.$onInit()
    Mock.permission.participantLaboratoryAccess = false;
    Mock.permission.sampleTransportationAccess = false;
    Mock.permission.examLotsAccess = false;
    Mock.permission.examSendingAccess = false;
    Mock.permission.unattachedLaboratoriesAccess = false;
    controller.active = true;
    controller.activeAll();
    expect(Mock.permission.participantLaboratoryAccess).toEqual(true);
    expect(Mock.permission.sampleTransportationAccess).toEqual(true);
    expect(Mock.permission.examLotsAccess).toEqual(true);
    expect(Mock.permission.examSendingAccess).toEqual(true);
    expect(Mock.permission.unattachedLaboratoriesAccess).toEqual(true);

  })

  function mockDependencies() {
    Mock.$mdToast = {
      show: function(){},
      simple: function(){
        return {
          textContent: function () {
            return {
              position: function () {
                return {
                  hideDelay: function () {

                  }
                }
              }
            }
          }
        }
      },
    };
  }

  function mockInjections(_$injector_) {
    Mock.permission = {
      objectType : "Laboratory",
      email: "otus@solutions.com",
      participantLaboratoryAccess: false,
      sampleTransportationAccess: false,
      examLotsAccess: false,
      examSendingAccess: false,
      unattachedLaboratoriesAccess: false
    };
    Mock.permissionGroup = {
      objectType : "Laboratory",
      email: "otus@solutions.com",
      participantLaboratoryAccess: false,
      sampleTransportationAccess: false,
      examLotsAccess: false,
      examSendingAccess: false,
      unattachedLaboratoriesAccess: false
    };

    Mock.response = {data:[]};

    Mock.ProjectPermissionService = _$injector_.get('ProjectPermissionService');


  }

});