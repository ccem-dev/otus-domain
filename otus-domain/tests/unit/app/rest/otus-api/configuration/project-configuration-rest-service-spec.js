describe('ProjectConfigurationService Test', function () {
  var Mock = {};
  var service;
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusDomain.rest', function ($provide) {
      $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
    });

    inject(function (_$injector_) {
      Injections = {
        $q: _$injector_.get('$q')
      };
      service = _$injector_.get('otusDomain.rest.configuration.ProjectConfigurationService', Injections);
    });
  });

  describe('basic set of tests', function () {

    it('should create a service', function () {
      expect(service).toBeDefined();
    });

  });

});