describe('Datasource Manager Service', function() {
  var Mock = {};
  var Injections = {};
  var service;
  var originalTimeout;

  beforeEach(function () {
    angular.mock.module('otusDomain.project.datasource');
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  describe('serviceInstance', function () {

    beforeEach(function () {
      mockInjections();

      angular.mock.module('otusDomain.rest', function ($provide) {
        $provide.value('DatasourceRestService', Mock.DatasourceRestService);
        $provide.value('DatasourceFactory', {create:()=>{}})
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
      it('createDatasource check and test return', function (done) {
        expect(service.createDatasource).toBeDefined();
        service.createDatasource(jasmine.any(Object)).then(function(){
          expect(Injections.DatasourceRestService.create()).toBeDefined();
          Mock.DatasourceRestService.create(Mock.datasourceList).then(function (data) {
            expect(data.data).toEqual(Mock.datasourceList);
            done();
          });
          done();
        });
        done();
      });

      it('getDatasourceList check and test return', function (done) {
        expect(service.getDatasourceList).toBeDefined();
        service.getDatasourceList().then(function(){
          expect(Injections.DatasourceRestService.list()).toBeDefined();
          Mock.DatasourceRestService.list().then(function (response) {
            expect(response.data.data).toEqual(Mock.datasourceList);
            done();
          });
          done();
        });
        done();
      });

      it('updateDatasource check and test return', function (done) {
        expect(service.updateDatasource).toBeDefined();
        service.updateDatasource(Mock.datasourceList).then(function(){
          expect(Injections.DatasourceRestService.update()).toBeDefined();
          Mock.DatasourceRestService.update(Mock.datasourceList).then(function (data) {
            expect(data.data).toEqual(Mock.datasourceList);
            done();
          });
          done();
        });
        done();
      });
    });

  });

  function mockInjections() {
    Mock.datasourceList = [
      {
      "id": "medicamentos",
      "name": "MEDICAMENTOS",
      "data": "fake1;extraction"
      },
      {
        "id": "teste",
        "name": "TESTE",
        "data": "fake1;extraction"
      }
  ];

    Mock.DatasourceRestService = {
      initialize: function () {
      },
      create: function (datasource) {
        return Promise.resolve({data:datasource});
      },
      list: function () {
        return Promise.resolve({data: {data:Mock.datasourceList}});
      },
      update: function (datasource) {
        return Promise.resolve({data:datasource});
      }
    };
    return Mock.DatasourceRestService;
  }

});