describe('Survey Group Permission Component Tests', function () {
  var Mock = {};
  var Injections = {};
  var controller;

  beforeEach(function () {
    mockInjections();
    angular.mock.module('otusDomain.project', function ($provide) {
      $provide.value('otusDomain.project.activity.SurveyGroupConfigurationService', Mock.SurveyGroupConfigurationService);
      $provide.value('$element', Mock.$element);
      $provide.value('ProjectPermissionService', Mock.ProjectPermissionService);
      $provide.value('$mdToast', Mock.$mdToast);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_, _$controller_) {
      Injections = {
        'SurveyGroupConfigurationService' : _$injector_.get('otusDomain.project.activity.SurveyGroupConfigurationService'),
        '$element' : _$injector_.get('$element'),
        'ProjectPermissionService': _$injector_.get('ProjectPermissionService'),
        '$mdToast': _$injector_.get('$mdToast')
      };

      controller = _$controller_('surveyGroupPermissionCtrl', Injections);
      controller.permission = Mock.permission;

      spyOn(Mock.SurveyGroupConfigurationService, "getListOfSurveyGroups").and.callThrough();
      spyOn(Mock.ProjectPermissionService, "savePermission").and.callThrough();
    });

  });

  it('should defined methods', function () {
    expect(controller.$onInit).toBeDefined();
    expect(controller.existsGroup).toBeDefined();
    expect(controller.isIndeterminateGroups).toBeDefined();
    expect(controller.isCheckedGroup).toBeDefined();
    expect(controller.toggleAllGroups).toBeDefined();
    expect(controller.clearSearchTerm).toBeDefined();
    expect(controller.savePermission).toBeDefined();
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

  it('should not call savePermission method', function () {
    controller.$onInit();
    controller.savePermission(true);
    expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledTimes(0);
  });

  it('should call savePermission method save', function () {
    controller.$onInit();
    controller.selectedGroups = Mock.surveyGroups.getGroupNames();
    controller.savePermission({email:"otus@solutions.com"});
    expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledTimes(1);
  });

  it('should call savePermission method not save', function () {
    controller.$onInit();
    controller.selectedGroups = Mock.surveyGroups.getGroupNames();
    Mock.response = undefined;
    controller.savePermission(true);
    expect(Mock.ProjectPermissionService.savePermission).toHaveBeenCalledTimes(1);
  });


  function mockInjections() {
    Mock.surveyGroups = {
      getGroupNames : function () {
        return ["otus", "solutions"];
      }
    };

    Mock.SurveyGroupConfigurationService = {
      getListOfSurveyGroups: function () {
        return Promise.resolve(Mock.surveyGroups)
      }
    };

    Mock.permission = {
      objectType : "SurveyGroupPermission",
      email: "otus@solutions.com",
      groups: []
    };

    Mock.response = {data:[]};

    Mock.ProjectPermissionService = {
      savePermission: function (p) {
        if (p){
          return Promise.resolve(Mock.response);
        } else {
          return Promise.reject();
        }
      }
    }

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
    }

    Mock.$element = {
      find: function () {
        return {
          on: function () {
            
          }
        }
      }
    }

  }

});