xdescribe('Datasource Rest Service', function() {
  var Mock = {};
  var service;
  var Injections = {};


  beforeEach(function () {
    angular.mock.module('otusDomain');
  });

  describe('serviceInstance', function () {

    beforeEach(function () {
      mockInjections();

      angular.mock.module('otusDomain', function ($provide) {
        $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
      });
    });

    beforeEach(function () {

      inject(function (_$injector_) {
        Injections = {
          OtusRestResourceService: Mock.OtusRestResourceService
        };
        service = _$injector_.get('DatasourceRestService', Injections);
        service.initialize();

      });
    });

    describe('initialize method', function() {
      beforeEach(function () {
        // spyOn(service, 'initialize').and.callThrough();
        // spyOn(Injections.OtusRestResourceService, 'getDatasourceResourceFactory').and.callThrough();
        service.initialize();
      });

      it('should initialize be defined', function() {
        expect(service.initialize).toHaveBeenCalled();
        expect(service.initialize).not.toBeNull();
        expect(Injections.OtusRestResourceService.getDatasourceResourceFactory).toHaveBeenCalled();
      });

    });
  });

  function mockInjections() {
    Mock.OtusRestResourceService = {
      getDatasourceResourceFactory: () => {
        return {
          create: () => {
            return Promise.resolve();
          },
          update: () => {
            return Promise.resolve();
          },
          list: () => {
            return Promise.resolve();
          }
        };
      }
    };
  }
});