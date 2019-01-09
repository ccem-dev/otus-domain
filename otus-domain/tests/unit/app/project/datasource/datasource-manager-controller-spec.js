describe('Datasource Manager Controller', function() {
  const FILE = 'fake1;extraction';
  const ID = 'medicamentos';
  const NAME = 'MEDICAMENTOS';

  var controller;
  var Mock = [];
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusDomain.dashboard');
  });

  describe('controllerInstance', function () {

    beforeEach(function () {
      mockInjections();

      angular.mock.module('otusDomain.dashboard', function ($provide) {
        $provide.value('DatasourceManagerService', Mock.DatasourceManagerService);
        $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
        $provide.value("$mdToast", Mock.mdToast);
      });

      inject(function (_$injector_, _$controller_) {
        Injections = {
          $mdToast: Mock.mdToast,
          DatasourceManagerService: Mock.DatasourceManagerService,
          OtusRestResourceService: Mock.OtusRestResourceService
        };
        controller = _$controller_('datasourceManagerController', Injections);
      });

    });

    it('controllerExistence check', function () {
      expect(controller).toBeDefined();
    });

    it('onInit check and test return', function () {
      expect(controller.$onInit).toBeDefined();
      expect(Injections.DatasourceManagerService._getDatasourceList()).toBeDefined();
      // Mock.DatasourceManagerService._getDatasourceList().then(function () {
      //   expect(controller.ready).toBeTruthy();
      // });
    });
    it('updateAction check and test return', function () {
      expect(controller.updateAction).toBeDefined();
      expect(Injections.DatasourceManagerService._updateDatasource(FILE)).toBeDefined();
    });

  });

  function mockInjections() {
    Mock.mdToast = {
      show: function(){},
      simple: function(){
        var self = this;
        self.title = function () {
          return self;
        };
        self.textContent = function () {
          return self;
        };
        self.position = function () {
          return self;
        };
        self.hideDelay = function () {
          return self;
        };
        return self;
      }
    }

    Mock.DatasourceManagerService = {
      _getDatasourceList: function () { return Promise.resolve()},
      _updateDatasource: function () { return Promise.resolve()},
      _createDatasource: function () { return Promise.resolve()}
    };
    Mock.OtusRestResourceService =  {
      getConfigurationResource: function () { return {} },
      getProjectConfigurationResource: function () { return {} },
      getDatasourceResourceFactory: function () { return {} }
    };
  }
});