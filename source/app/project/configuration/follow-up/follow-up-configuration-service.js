(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('otusDomain.dashboard.FollowUpConfigurationService', Service);

  Service.$inject = [
    'FollowUpRestService',
    'EventRestService'
  ];

  function Service(FollowUpRestService, EventRestService) {

    var self = this;
    self.loadConfiguration = loadConfiguration;
    self.deactivateEvent = deactivateEvent;
    self.addEvent = addEvent;
    self.addFollowUp = addFollowUp;
    self.updateFollowUp = updateFollowUp;
    self.deactivateFollowUp = deactivateFollowUp;


    function loadConfiguration() {
      return FollowUpRestService.list();
    }

    function addFollowUp(followUp) {
      return FollowUpRestService.add(followUp);
    }

    function updateFollowUp(followUp) {
      return FollowUpRestService.update(followUp)
    }

    function deactivateFollowUp(id) {
      return FollowUpRestService.deactivate(id);
    }

    function addEvent(id, followUpEvent) {
      return EventRestService.create(id, followUpEvent)
    }

    function deactivateEvent(id) {
      return EventRestService.deactivate(id)
    }
  }
}());
