describe('Datasource Manager Controller', function() {
  const FILE = 'fake1;extraction';

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
    });

    beforeEach(function () {

      inject(function (_$controller_) {
        Injections = {
          $mdToast: Mock.mdToast,
          DatasourceManagerService: Mock.DatasourceManagerService,
          OtusRestResourceService: Mock.OtusRestResourceService
        };
        controller = _$controller_('DatasourceManagerController', Injections);
        spyOn(Injections.DatasourceManagerService, "getDatasourceList").and.callThrough();
        spyOn(Injections.DatasourceManagerService, "createDatasource").and.callThrough();
        spyOn(Injections.DatasourceManagerService, "updateDatasource").and.callThrough();
        controller.$onInit();
      });

    });

    it('controllerExistence check', function () {
      expect(controller).toBeDefined();
    });

    describe("Test for controller", function() {

      beforeEach(function() {
        spyOn(controller, "exportDatasource");
        controller.exportDatasource(Mock.datasourceList);
      });

      it('onInit check and test return', function () {
        expect(controller.$onInit).toBeDefined();
        expect(Injections.DatasourceManagerService.getDatasourceList()).toBeDefined();
        Mock.DatasourceManagerService.getDatasourceList().then(function () {
          expect(controller.ready).toBeTruthy();
        });
      });

      it('updateAction check', function () {
        expect(controller.updateAction).toBeDefined();
      });

      it("action check method", function() {
        expect(controller.action).toBeDefined();
        expect(Injections.DatasourceManagerService.createDatasource(FILE)).toBeDefined();
        expect(Injections.DatasourceManagerService.updateDatasource(Mock.datasourceList)).toBeDefined();
      });

      it('exportDatasource check and test return', function () {
        expect(controller.exportDatasource).toBeDefined();
        expect(controller.exportDatasource).toHaveBeenCalledWith(Mock.datasourceList);
      });

    });

  });

  function mockInjections() {
    Mock.datasourceList = {
      "id": "medicamentos",
      "name": "MEDICAMENTOS",
      "data": "fake1;extraction"
    }

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
      getDatasourceList: function () { return Promise.resolve()},
      updateDatasource: function () { return Promise.resolve()},
      createDatasource: function () { return Promise.resolve()}
    };
    Mock.OtusRestResourceService =  {
      getConfigurationResource: function () { return {} },
      getProjectConfigurationResource: function () { return {} },
      getDatasourceResourceFactory: function () { return {} }
    };
  }
});