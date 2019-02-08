describe('Datasource Rest Service', function() {
  const ID = 'medicamentos';

  var Mock = {};
  var service;
  var Injections = {};


  beforeEach(function () {
    angular.mock.module('otusDomain.rest');
  });

  describe('serviceInstance', function () {

    beforeEach(function () {
      mockInjections();

      angular.mock.module('otusDomain.rest', function ($provide) {
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
        spyOn(service, 'initialize').and.callThrough();
        spyOn(Injections.OtusRestResourceService, 'getDatasourceResourceFactory').and.callThrough();
        service.initialize();
      });

      it('should initialize be defined', function() {
        expect(service.initialize).toHaveBeenCalled();
        expect(service.initialize).not.toBeNull();
        expect(Injections.OtusRestResourceService.getDatasourceResourceFactory).toHaveBeenCalled();
      });

    });

    describe('create method', function() {
      beforeEach(function() {
        spyOn(service, 'create').and.callThrough();
        service.create();
      });

      it('should create be defined', function() {
        expect(service.create).toHaveBeenCalled();
        expect(service.create).not.toBeNull();
        service.create(Mock.datasourceList).then(function (data) {
          expect(data.data).toEqual(Mock.datasourceList);
        });
      });
    });

    describe('update method', function() {
      beforeEach(function() {
        spyOn(service, 'update').and.callThrough();
        service.update();
      });

      it('should update be defined', function() {
        expect(service.update).toHaveBeenCalled();
        expect(service.update).not.toBeNull();
        service.update(Mock.datasourceList).then(function (data) {
          expect(data.data).toEqual(Mock.datasourceList);
        });
      });
    });

    describe('list method', function() {
      beforeEach(function() {
        spyOn(service, 'list').and.callThrough();
        service.list();
      });

      it('should update be defined', function() {
        expect(service.list).toHaveBeenCalled();
        expect(service.list).not.toBeNull();
        service.list().then(function (data) {
          expect(data.data).toEqual(Mock.datasourceList);
        });
      });
    });

    describe('getById method', function() {
      beforeEach(function() {
        spyOn(service, 'getById').and.callThrough();
        service.getById();
      });

      it('should update be defined', function() {
        expect(service.getById).toHaveBeenCalled();
        expect(service.getById).not.toBeNull();
        service.getById(ID).then(function (data) {
          expect(data.id).toEqual(ID);
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

    Mock.OtusRestResourceService = {
      getDatasourceResourceFactory: () => {
        return {
          create: (datasource) => {
            return Promise.resolve({data:datasource});
          },
          update: (datasource) => {
            return Promise.resolve({data:datasource});
          },
          list: () => {
            return Promise.resolve({data: Mock.datasourceList});
          },
          getById: function(ID) {
            return Promise.resolve({id: ID});
          }
        };
      }
    };
  }
});