describe('Activity Permission Component Tests', function () {
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

            PERMISSION_NAME = Injections.PERMISSION_LIST.ACTIVITY;
            controller = _$controller_('activityPermissionController', Injections);
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
        Mock.permission.participantActivityAccess = true;
        Mock.permission.offlineActivitySincAccess = true;
        controller.save(Mock.permission);
        expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledWith(Mock.permission);
    });

    it('should call method isEqual', function () {
        controller.$onInit();
        Mock.permission.participantActivityAccess = true;
        Mock.permission.offlineActivitySincAccess = true;
        Mock.permissionGroup.participantActivityAccess = true;
        Mock.permissionGroup.participantActivityAccess = true
        controller.isEqual();
    })
    it('should call method isActive', function () {
        controller.$onInit()
        Mock.permission.participantActivityAccess = true;
        Mock.permission.offlineActivitySincAccess = true;
        controller.isActive();
    })

    it('should call method activeAll', function () {
        controller.$onInit()
        Mock.permission.participantActivityAccess = false;
        Mock.permission.offlineActivitySincAccess = false;
        controller.active = true;
        controller.activeAll();
        expect(Mock.permission.participantActivityAccess).toEqual(true);
        expect(Mock.permission.offlineActivitySincAccess).toEqual(true);

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
            objectType : "Activity",
            email: "otus@solutions.com",
            participantActivityAccess: false,
            offlineActivitySincAccess: false,
        };

        Mock.permissionGroup = {
            objectType : "Activity",
            email: "otus@solutions.com",
            participantActivityAccess: false,
            offlineActivitySincAccess: false,
        }

        Mock.active = false;

        Mock.response = {data:[]};

        Mock.ProjectPermissionService = _$injector_.get('ProjectPermissionService');


    }

});