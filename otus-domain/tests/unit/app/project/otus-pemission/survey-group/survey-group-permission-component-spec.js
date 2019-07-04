fdescribe('Survey Group Permission Component Tests', function () {
  var Mock = {};
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
        'PERMISSION_LIST': _$injector_.get('PERMISSION_LIST'),
        'SurveyGroupConfigurationService' : Mock.SurveyGroupConfigurationService,
        '$element' : _$injector_.get('$element'),
        'ProjectPermissionService': Mock.ProjectPermissionService,
        '$mdToast': _$injector_.get('$mdToast')
      };

      controller = _$controller_('surveyGroupPermissionCtrl', Injections);
      spyOn(Mock.SurveyGroupConfigurationService, "getListOfSurveyGroups").and.returnValue(Promise.resolve(Mock.surveyGroups));
      spyOn(Mock.ProjectPermissionService, "savePermission").and.returnValue(Promise.resolve());
      spyOn(Mock.ProjectPermissionService, "getPermissionByType").and.returnValue(Mock.permission);
    });

  });

  it('should defined methods', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.existsGroup).toBeDefined();
    expect(controller.isIndeterminateGroups).toBeDefined();
    expect(controller.isCheckedGroup).toBeDefined();
    expect(controller.toggleAllGroups).toBeDefined();
    expect(controller.clearSearchTerm).toBeDefined();
    expect(controller.save).toBeDefined();
    expect(controller.surveysGroups).toBeDefined();
    expect(controller.selectedGroups).toBeDefined();
    expect(controller.groupList).toBeDefined();
  });

  it('should call $onInit method', function () {
    controller.$onInit();
    expect(Mock.SurveyGroupConfigurationService.getListOfSurveyGroups).toHaveBeenCalledTimes(1);
  });

  it('should call existsGroup method', function () {
    expect(controller.existsGroup("otus")).toBeFalsy();
    controller.selectedGroups.push("otus");
    expect(controller.existsGroup("otus")).toBeTruthy();
  });

  it('should call isIndeterminateGroups method', function () {
    expect(controller.isIndeterminateGroups()).toBeFalsy();
    controller.selectedGroups.push("otus");
    expect(controller.isIndeterminateGroups()).toBeTruthy();
  });

  it('should call isCheckedGroup method', function () {
    expect(controller.isCheckedGroup()).toBeTruthy();
    controller.selectedGroups = Mock.surveyGroups.getGroupNames();
    expect(controller.isCheckedGroup()).toBeFalsy();
  });

  it('should call toggleAllGroups method', function () {
    controller.groupList = Mock.surveyGroups.getGroupNames();
    controller.selectedGroups = [];
    expect(controller.selectedGroups.length).toBeLessThan(2);
    controller.toggleAllGroups();
    expect(controller.selectedGroups.length).toEqual(2);
    expect(controller.selectedGroups).toEqual(controller.selectedGroups);
    controller.toggleAllGroups();
    expect(controller.selectedGroups.length).toEqual(0);
  });

  it('should clear searchTerm method', function () {
    controller.searchTerm = "OTUS";
    controller.clearSearchTerm();
    expect(controller.searchTerm).toEqual('');
  });

  it('should not call save method', function () {
    controller.$onInit();
    controller.save(true);
    expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledTimes(0);
  });

  it('should call save method save', function () {
    controller.$onInit();
    controller.selectedGroups = Mock.surveyGroups.getGroupNames();
    controller.save({email:"otus@solutions.com"});
    expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledTimes(1);
  });

  it('should call save method not save', function () {
    controller.$onInit();
    controller.selectedGroups = Mock.surveyGroups.getGroupNames();
    Mock.response = undefined;
    controller.save(true);
    expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledTimes(1);
  });


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

    Mock.$element = {
      find: function () {
        return {
          on: function () {

          }
        }
      }
    }

  }

  function mockInjections(_$injector_) {
    Mock.surveyGroups = {
      getGroupNames : function () {
        return ["otus", "solutions"];
      }
    };

    Mock.SurveyGroupConfigurationService = _$injector_.get('otusDomain.project.activity.SurveyGroupConfigurationService');

    Mock.permission = {
      objectType : "SurveyGroupPermission",
      email: "otus@solutions.com",
      groups: []
    };

    Mock.response = {data:[]};

    Mock.ProjectPermissionService = _$injector_.get('ProjectPermissionService');


  }

});