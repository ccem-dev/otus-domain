(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('otusDomain.dashboard.outcome.OutcomeConfigurationService', Service);

  Service.$inject = [
    '$q',
    'SurveyGroupRestService',
    'otusjs.model.outcome.OutcomeFactory'
  ];

  function Service($q, SurveyGroupRestService, OutcomeFactory) {

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
      var deferred = $q.defer();
      if (true) deferred.resolve();
      return deferred.promise;
    }
    
    function saveConfiguration() {
      var deferred = $q.defer();
      if (true) deferred.resolve();
      return deferred.promise;
    }

    function updateConfiguration() {
      var deferred = $q.defer();
      if (true) deferred.resolve();
      return deferred.promise;
    }



  }
}());
