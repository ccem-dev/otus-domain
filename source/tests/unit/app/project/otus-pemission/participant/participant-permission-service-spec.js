describe('Participant Permission Component Tests', function () {
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

            PERMISSION_NAME = Injections.PERMISSION_LIST.PARTICIPANT;
            controller = _$controller_('participantPermissionController', Injections);
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
        Mock.permission.participantListAccess = true;
        Mock.permission.participantCreateAccess = true;
        Mock.permission.anonymousParticipantAccess = true;
        controller.save(Mock.permission);
        expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledWith(Mock.permission);
    });

    it('should call method isEqual', function () {
        controller.$onInit();
        Mock.permission.participantListAccess = true;
        Mock.permission.participantCreateAccess = true;
        Mock.permission.anonymousParticipantAccess = true;
        controller.isEqual();
    })
    it('should call method isActive', function () {
        controller.$onInit()
        Mock.permission.participantListAccess = true;
        Mock.permission.participantCreateAccess = true;
        Mock.permission.anonymousParticipantAccess = true;
        controller.isActive();
    })

    it('should call method activeAll', function () {
        controller.$onInit()
        Mock.permission.participantListAccess = false;
        Mock.permission.participantCreateAccess = false;
        Mock.permission.anonymousParticipantAccess = false;
        controller.active = true;
        controller.activeAll();
        expect(Mock.permission.participantListAccess).toEqual(true);
        expect(Mock.permission.participantCreateAccess).toEqual(true);
        expect(Mock.permission.anonymousParticipantAccess).toEqual(true);

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
            objectType : "Monitoring",
            email: "otus@solutions.com",
            participantListAccess: false,
            participantCreateAccess: false,
            anonymousParticipantAccess: false,
        };

        Mock.response = {data:[]};

        Mock.ProjectPermissionService = _$injector_.get('ProjectPermissionService');


    }

});