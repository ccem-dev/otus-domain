describe('Datasource Manager Component', function() {
  const FILE = 'fake1;extraction';

  var controller;
  var Mock = [];
  var Injections = {};

  beforeEach(function () {
    angular.mock.module('otusDomain.project.datasource');
  });

  describe('componentInstance', function () {

    beforeEach(function () {
      mockInjections();

      angular.mock.module('otusDomain.project.datasource', function ($provide) {
        $provide.value('DatasourceManagerService', Mock.DatasourceManagerService);
        $provide.value("$mdToast", Mock.mdToast);
        $provide.value("$mdDialog", Mock.$mdDialog);
      });

      angular.mock.module('otusDomain.rest', function ($provide) {
        $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
      });
    });

    beforeEach(function () {

      inject(function (_$controller_,_$injector_) {

        Injections = {
          $mdToast: Mock.mdToast,
          DatasourceManagerService: _$injector_.get('DatasourceManagerService'),
          OtusRestResourceService: _$injector_.get('OtusRestResourceService')
        };
        controller = _$controller_('datasourceManagerController', Injections);
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