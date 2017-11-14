(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .service('ExtractionRestService', Service);

  Service.$inject = [
    'OtusRestResourceService'
  ];

  function Service(OtusRestResourceService) {
    var self = this;

    var extractionResource = OtusRestResourceService.getExtractionResource();

    self.enableExtraction = enableExtraction;
    self.disableExtraction = disableExtraction;
    self.updateExtractionIps = updateExtractionIps;

    function enableExtraction(user) {
      return extractionResource.enableExtraction(user).$promise;
    }

    function disableExtraction(user) {
      return extractionResource.disableExtraction(user).$promise;
    }

    function updateExtractionIps(user) {
      return extractionResource.updateExtractionIps(user).$promise;
    }
  }
}());
