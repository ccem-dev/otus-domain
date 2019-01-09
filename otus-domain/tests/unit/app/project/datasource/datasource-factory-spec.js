describe('Datasource Factory', function () {
  var factory;

  beforeEach(function () {
    angular.mock.module('otusDomain.dashboard');
  });

  describe('The creation method', function () {
    var datasourceInfo;
    var datasource;

    beforeEach(inject(function (_$injector_) {
      factory = _$injector_.get('DatasourceFactory');
    }));

    beforeEach(function () {
      datasourceInfo = {
        id: 'id',
        name: 'name',
        data: 'data'
      };

      datasource = factory.create(datasourceInfo);

    });

    it('factoryExistence check', function () {
      expect(factory).toBeDefined();
    });

    it('createMethodExistence check', function () {
      expect(factory.create).toBeDefined();
    });

    it('should keep creation object properties', function () {
      expect(datasource.id).toEqual(datasourceInfo.id);
      expect(datasource.name).toEqual(datasourceInfo.name);
      expect(datasource.data).toEqual(datasourceInfo.data);
    });
  });

});
