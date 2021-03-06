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
    var groupManagerFactory;
    var self = this;

    /* Public methods */
    self.getListOfSurveyGroups = getListOfSurveyGroups;
    self.addNewSurveyGroup = addNewSurveyGroup;
    self.updateSurveyGroupName = updateSurveyGroupName;
    self.updateSurveyGroupAcronyms = updateSurveyGroupAcronyms;
    self.deleteSurveyGroup = deleteSurveyGroup;

    function getListOfSurveyGroups() {
      return SurveyGroupRestService.getListOfSurveyGroups()
        .then(function (response) {
          groupManagerFactory = GroupManagerFactory.create(response);
          return groupManagerFactory;
        }).catch(function (e) {
          return $q.reject(e);
        });
    }

    function addNewSurveyGroup(group) {
      try {
        var newGroup = groupManagerFactory.createGroup(group, []);
        return SurveyGroupRestService.addNewSurveyGroup(newGroup)
          .then(function (response) {
            return response;
          }).catch(function (e) {
            return $q.reject(e);
          });
      } catch (e) {
        return $q.reject(e);
      }
    }

    function updateSurveyGroupName(oldName, newName) {
      var update = {
        surveyGroupName: oldName,
        newSurveyGroupName: newName
      };
      if(oldName === newName) return Promise.resolve({});
      return SurveyGroupRestService.updateSurveyGroupName(update)
        .then(function (response) {
          return response;
        }).catch(function (e) {
          return $q.reject(e);
        });
    }

    function deleteSurveyGroup(name) {
      var deleteGroup = {
        surveyGroupName: name,
        newSurveyGroupName: ''
      };
      return SurveyGroupRestService.deleteSurveyGroup(deleteGroup)
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
