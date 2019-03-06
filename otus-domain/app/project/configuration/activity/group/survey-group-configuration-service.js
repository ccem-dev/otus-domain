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
    self.addNewSurveyGroup = addNewSurveyGroup;
    self.updateSurveyGroupName = updateSurveyGroupName;
    self.deleteSurveyGroup = deleteSurveyGroup;
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
        oldName: oldName,
        newName: newName
      };
      return SurveyGroupRestService.updateSurveyGroupName(update)
        .then(function (response) {
          return response;
        }).catch(function (e) {
          return $q.reject(e);
        });
    }

    function deleteSurveyGroup(group) {
      return SurveyGroupRestService.deleteSurveyGroup(group.getName())
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
