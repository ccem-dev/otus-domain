describe('Datasource Manager Service', function() {
  var Mock = {};
  var Injections = {};
  var service;

  beforeEach(function () {
    angular.mock.module('otusDomain.dashboard');
  });

  describe('serviceInstance', function () {

    beforeEach(function () {
      mockInjections();

      angular.mock.module('otusDomain.dashboard', function ($provide) {
        $provide.value('DatasourceRestService', Mock.DatasourceRestService);
      });
    });

    beforeEach(function () {

      inject(function (_$injector_, _$q_) {
        Injections = {
          DatasourceRestService: _$injector_.get('DatasourceRestService'),
          DatasourceFactory: _$injector_.get('DatasourceFactory'),
          $q: _$q_
        };
        service = _$injector_.get('DatasourceManagerService', Injections);
        spyOn(Injections.DatasourceRestService, "create").and.callThrough();
        spyOn(Injections.DatasourceRestService, "list").and.callThrough();
        spyOn(Injections.DatasourceRestService, "update").and.callThrough();

      });

    });

    it('serviceExistence check', function () {
      expect(service).toBeDefined();
    });

    describe("Test for service", function() {
      it('createDatasource check and test return', function () {
        expect(service.createDatasource).toBeDefined();
        expect(Injections.DatasourceRestService.create()).toBeDefined();
        Mock.DatasourceRestService.create(Mock.datasourceList).then(function (data) {
          expect(data.data).toEqual(Mock.datasourceList);
        });
      });

      it('getDatasourceList check and test return', function () {
        expect(service.getDatasourceList).toBeDefined();
        expect(Injections.DatasourceRestService.list()).toBeDefined();
        Mock.DatasourceRestService.list().then(function (data) {
          expect(data.data).toEqual(Mock.datasourceList);
        });
      });

      it('updateDatasource check and test return', function () {
        expect(service.updateDatasource).toBeDefined();
        expect(Injections.DatasourceRestService.update()).toBeDefined();
        Mock.DatasourceRestService.update(Mock.datasourceList).then(function (data) {
          expect(data.data).toEqual(Mock.datasourceList);
        });
      });
    });

  });

  function mockInjections() {
    Mock.datasourceList = {
      "id": "medicamentos",
      "name": "MEDICAMENTOS",
      "data": "fake1;extraction"
    }

    Mock.DatasourceRestService = {
      initialize: function () {
      },
      create: function (datasource) {
        return Promise.resolve({data:datasource});
      },
      list: function () {
        return Promise.resolve({data: Mock.datasourceList});
      },
      update: function (datasource) {
        return Promise.resolve({data:datasource});
      }
    };
    return Mock.DatasourceRestService;
  }

});