(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .service('otusDomain.project.activity.SurveyGroupConfigurationService', Service);

  Service.$inject = [
    '$q',
    'SurveyGroupRestService',
    'otusjs.survey.GroupManagerFactory'
  ];

  function Service($q, SurveyGroupRestService, GroupManagerFactory) {
    var groupManagerFactory
    var self = this;

    /* Public methods */
    self.getListOfSurveyGroups = getListOfSurveyGroups;
    self.addNewGroup = addNewGroup;
    self.updateGroupName = updateGroupName;
    self.deleteGroup = deleteGroup;
    self.updateSurveyGroupAcronyms = updateSurveyGroupAcronyms;

    onInit();

    function onInit() {
      SurveyGroupRestService.initialize();
    }

    function getListOfSurveyGroups() {
      return SurveyGroupRestService.getListOfSurveyGroups()
        .then(function (response) {
          groupManagerFactory = GroupManagerFactory.create(response);
          return groupManagerFactory;
        }).catch(function (e) {
          return $q.reject(e);
        });
    }

    function addNewGroup(group) {
      try {
        var newGroup = groupManagerFactory.createGroup(group, []);
        return SurveyGroupRestService.addNewGroup(newGroup)
          .then(function (response) {
            return response;
          }).catch(function (e) {
            return $q.reject(e);
          });
      } catch (e) {
        return $q.reject(e);
      }
    }

    function updateGroupName(oldName, newName) {
      return SurveyGroupRestService.updateGroupName(oldName, newName)
        .then(function (response) {
          return response;
        }).catch(function (e) {
          return $q.reject(e);
        });
    }

    function deleteGroup(group) {
      return SurveyGroupRestService.deleteGroup(group.getName())
        .then(function (response) {
          return response;
        }).catch(function (e) {
          return $q.reject(e);
        });
    }

    function updateSurveyGroupAcronyms(group) {
      return SurveyGroupRestService.updateSurveyGroupAcronyms(group)
        .then(function (response) {
          return response;
        }).catch(function (e) {
          return $q.reject(e);
        });
    }
  }
}());
