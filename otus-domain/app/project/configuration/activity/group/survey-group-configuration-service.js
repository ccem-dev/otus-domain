(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .service('otusDomain.project.activity.SurveyGroupConfigurationService', Service);

  Service.$inject = [
    'SurveyGroupRestService',
    'otusjs.survey.GroupManagerFactory'
  ];

  function Service(SurveyGroupRestService, GroupManagerFactory) {
    var groupManagerFactory
    var self = this;

    /* Public methods */
    self.getListOfSurveyGroups = getListOfSurveyGroups;
    self.addNewGroup = addNewGroup;
    self.updateGroup = updateGroup;
    self.deleteGroup = deleteGroup;

    onInit();

    function onInit() {
      SurveyGroupRestService.initialize();
    }

    function getListOfSurveyGroups() {
      return SurveyGroupRestService.getListOfSurveyGroups()
        .then(function(response) {
          groupManagerFactory = GroupManagerFactory.create(response);
          return groupManagerFactory;
        }).catch(function(e) {
          return $q.reject(e);
        });
    }

    function addNewGroup(group) {
      var newGroup = groupManagerFactory.createGroup(group, []);
      return SurveyGroupRestService.addNewGroup(newGroup)
        .then(function(response) {
          return response;
        }).catch(function(e) {
          return $q.reject(e);
        });
    }

    function updateGroup(group) {
      return SurveyGroupRestService.updateGroup(newGroup)
        .then(function(response) {
          return response;
        }).catch(function(e) {
          return $q.reject(e);
        });
    }

    function deleteGroup(group) {
      return SurveyGroupRestService.deleteGroup(group.getName())
        .then(function(response) {
          return response;
        }).catch(function(e) {
          return $q.reject(e);
        });
    }
  }
}());
