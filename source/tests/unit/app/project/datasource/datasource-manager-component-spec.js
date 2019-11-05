describe('Datasource Manager Component', function () {
  const FILE = 'fake1;extraction';

  var controller;
  var Mock = [];

  describe('componentInstance', function () {

    beforeEach(function () {
      mockInjections();
      angular.mock.module('otusDomain.rest', function ($provide) {
        $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
      });
      angular.mock.module('otusDomain.project.datasource', function ($provide) {
        $provide.value('DatasourceManagerService', Mock.DatasourceManagerService);
        $provide.value("$mdToast", Mock.mdToast);
        $provide.value("$mdDialog", Mock.$mdDialog);
        $provide.value("alasql", ()=>{});
      });
    });

    beforeEach(function () {
      inject(function (_$controller_, _$injector_) {
        controller = _$controller_('datasourceManagerController');
        spyOn(Mock.DatasourceManagerService, "getDatasourceList").and.callThrough();
        spyOn(Mock.DatasourceManagerService, "createDatasource").and.callThrough();
        spyOn(Mock.DatasourceManagerService, "updateDatasource").and.callThrough();
        spyOn(window, "alasql").and.returnValue(true);
        controller.$onInit();
      });
    });

    it('controllerExistence check', function () {
      expect(controller).toBeDefined();
    });

    describe("Test for controller", function () {

      beforeEach(function () {
        spyOn(controller, "exportDatasource").and.callThrough();
        controller.exportDatasource(Mock.datasourceList);
      });

      it('onInit check and test return', function () {
        expect(controller.$onInit).toBeDefined();
        expect(Mock.DatasourceManagerService.getDatasourceList()).toBeDefined();
        Mock.DatasourceManagerService.getDatasourceList().then(function () {
          expect(controller.ready).toBeTruthy();
        });
      });

      it('isLoading check', function () {
        expect(controller.loadFile).toBeFalsy();
        expect(typeof controller.isLoading).toEqual("function");
        expect(controller.isLoading()).toEqual(false);
        controller.initLoadFile();
        expect(controller.isLoading()).toEqual(true);
      });

      it('updateAction check', function () {
        expect(controller.updateAction).toBeDefined();
        expect(controller.isUpdate).toBeFalsy();
        controller.updateAction(Mock.datasourceList);
        expect(controller.isUpdate).toBeTruthy();
      });

      it("action check method", function () {
        expect(controller.action).toBeDefined();
        expect(Mock.DatasourceManagerService.createDatasource(FILE)).toBeDefined();
        expect(Mock.DatasourceManagerService.updateDatasource(Mock.datasourceList)).toBeDefined();
      });
      
      it("newDatasourceAction check method", function () {
        expect(controller.newDatasourceAction).toBeDefined();
        controller.newDatasourceAction();
        expect(controller.insertingNewDatasource).toBeTruthy();

      });
      
      it("cancelUpload check method", function () {
        expect(controller.cancelUpload).toBeDefined();
        controller.newDatasourceAction();
        expect(controller.insertingNewDatasource).toBeTruthy();
        controller.cancelUpload();
        expect(controller.newDatasourceFile).toBeUndefined();
        expect(controller.insertingNewDatasource).toBeUndefined();
      });

      it('exportDatasource check and test return', function () {
        controller.exportDatasource(Mock.datasourceList);
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
      show: function () {},
      simple: function () {
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
      getDatasourceList: function () {
        return Promise.resolve()
      },
      updateDatasource: function () {
        return Promise.resolve()
      },
      createDatasource: function () {
        return Promise.resolve()
      }
    };
    Mock.OtusRestResourceService = {
      getConfigurationResource: function () {
        return {}
      },
      getProjectConfigurationResource: function () {
        return {}
      },
      getDatasourceResourceFactory: function () {
        return {}
      }
    };
  }
});