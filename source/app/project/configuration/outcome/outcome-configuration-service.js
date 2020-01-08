(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('otusDomain.dashboard.outcome.OutcomeConfigurationService', Service);

  Service.$inject = [
    'OutcomeRestService',
    'otusjs.model.outcome.OutcomeFactory'
  ];

  function Service(OutcomeRestService, OutcomeFactory) {

    var self = this;
    self.initialize = initialize;
    self.load = load;
    self.loadConfiguration = loadConfiguration;
    self.saveConfiguration = saveConfiguration;
    self.updateConfiguration = updateConfiguration;

    function initialize() {
      return OutcomeFactory.create();
    }

    function load(data) {
      return OutcomeFactory.fromJson(data);
    }
    
    function loadConfiguration() {
      return OutcomeRestService.list();
    }
    
    function saveConfiguration(outcome) {
      return OutcomeRestService.create(outcome);
    }

    function updateConfiguration(outcome) {
      return OutcomeRestService.update(outcome);
    }
  }
}());
