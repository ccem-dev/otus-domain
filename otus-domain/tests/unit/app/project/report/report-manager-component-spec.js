describe('Report Manager Component', function() {
  var TEMPLATE = '<md-content flex layout-align="center start">'
  '<md-subheader class="md-primary">Relatórios</md-subheader>' +
  '<md-content layout="row" layout-align="center center" flex=100>' +
  '<md-input-container flex-gt-md=50 flex=90>' +
  '<md-icon>search</md-icon>' +
  '<input ng-model="query.label" placeholder="Buscar por Nome de Relatório">' +
  '</md-input-container>' +
  '</md-content>' +
  '<md-card flex layout-align="center center" layout="row" ng-if="$ctrl.ready" ng-repeat="report in $ctrl.reports | orderBy: report.label | filter : query track by $index">' +
  '<div layout="column" flex>' +
  '<div layout="row" layout-xs="column" flex>' +
  '<md-card-title layout="row" layout-xs="column" layout-align="center center">' +
  '<md-card-title-media layout="row" flex="10">' +
  '<div class="md-media-sm card-media" layout="row" flex>' +
  '<i class="material-icons iconBigger">description</i>' +
  '</div>' +
  '</md-card-title-media>' +
  '<md-card-title-text layout="row" flex>' +
  '<div layout="column" layout-align="start start" flex>' +
  '<div layout="row" layout-align="start start">' +
  '<span class="md-headline">{{report.label}}</span>' +
  '</div>' +
  '<div layout="row" layout-align="start start">' +
  '<span class="md-subhead description">{{report.sendingDate | date: \'dd/MM/y\'}}</span>' +
  '</div>' +

  '<div layout="row" layout-align="start start" flex>' +
  '<span class="md-subhead description">{{report.sender}}</span>' +
  '</div>' +
  '</div>' +
  '</md-card-title-text>' +
  '</md-card-title>' +
  '<md-card-actions layout="row" flex="15" flex-md="20" flex-sm="25" flex-xs="30" layout-align="center center">' +
  '<md-action flex layout="column">' +
  '<div layout="row" flex>' +
  '<div layout="column" flex="50" layout-align="start end">' +
  '<md-subheader class="md-subhead description backgroud-color-default">Remover:</md-subheader>' +
  '</div>' +
  '<div layout="column" flex>' +
  '<md-button class="md-icon-button" ng-click="$ctrl.deleteReport(report, $index)">' +
  '<md-icon aria-label="Delete">delete_forever</md-icon>' +
  '<md-tooltip md-direction="bottom">Excluir</md-tooltip>' +
  '</md-button>' +
  '</div>' +
  '</div>' +
  '<div layout="row" flex>' +
  '<div layout="column" flex="50" layout-align="start end">' +
  '<md-subheader class="md-subhead description backgroud-color-default">Baixar:</md-subheader>' +
  '</div>' +
  '<div layout="column">' +
  '<md-button class="md-icon-button" ng-click="$ctrl.exportReport(report)">' +
  '<md-icon aria-label="Download">file_download</md-icon>' +
  '<md-tooltip md-direction="bottom">Baixar</md-tooltip>' +
  '</md-button>' +
  '</div>' +
  '</div>' +
  '<div layout="row" flex>' +
  '<div layout="column" flex="50" layout-align="start end">' +
  '<md-subheader class="md-subhead description backgroud-color-default">Salvar:</md-subheader>' +
  '</div>' +
  '<div layout="column" flex>' +
  '<md-button class="md-icon-button" ng-click="$ctrl.updateReport(report)">' +
  '<md-icon aria-label="Update" class="md-primary">save</md-icon>' +
  '<md-tooltip md-direction="bottom">Atualizar Centro</md-tooltip>' +
  '</md-button>' +
  '</div>' +
  '</div>' +

  '</md-action>' +
  '</md-card-actions>' +
  '</div>' +
  '<md-divider flex="20"></md-divider>' +
  '<div layout="row" flex layout-align="start center">' +
  '<div layout="column" flex="10" layout-align="end center">' +
  '<md-subheader class="md-subhead description backgroud-color-default">Centro(s):</md-subheader>' +
  '</div>' +
  '<div layout="column" flex="80" layout-fill>' +
  '<md-input-container class="margin-small-top field-user-position" flex="20">' +
  '<md-select aria-label="Selecione o(s) estado(s)" ng-model="report.fieldCenter" multiple>' +
  '<md-option ng-repeat="center in $ctrl.fieldCenters | orderBy: center.name" ng-value="center.acronym">{{center.acronym}}</md-option>' +
  '<md-tooltip md-direction="bottom">Centros</md-tooltip>' +
  '</md-select>' +
  '</md-input-container>' +
  '</div>' +
  '</div>' +
  '</div>' +
  '</md-card>' +
  '</md-content>' +
  '<md-fab-speed-dial count="0" md-direction="up" class="md-fab md-fab-bottom-right md-fling">' +
  '<md-fab-trigger>' +
  '<md-button aria-label="menu" class="md-fab md-primary" report-template-upload="$ctrl.uploadReport">' +
  '<md-icon md-svg-icon="plus"></md-icon>' +
  '</md-button>' +
  '</md-fab-trigger>' +
  '</md-fab-speed-dial>';

  var reportData = {
    "_id": {
      "$oid": "5ac7f96d787e4f00e9a91d9d"
    },
    "template": "<otus-datasource></otus-datasource>\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n",
    "label": "Cabeçalho do Participante e ultima coleta",
    "sender": "ccem.projects@gmail.com",
    "sendingDate": "2018-04-06T22:49:17.763Z",
    "fieldCenter": [
      "SP",
      "RS",
      "RJ",
      "ES"
    ],
    "dataSources": [{
        "key": "cabeçalho",
        "dataSource": "Participant",
        "label": "Cabeçalho do Participante",
        "result": []
      },
      {
        "filters": {
          "acronym": "CSJ",
          "category": "C0",
          "statusHistory": {
            "name": "FINALIZED",
            "position": -1
          }
        },
        "key": "Status finalizado",
        "dataSource": "Activity",
        "label": "Ultima coleta",
        "result": []
      }
    ]
  };

  var reportList = [{
      "_id": {
        "$oid": "5ac7f96d787e4f00e9a91d9d"
      },
      "template": "<otus-datasource></otus-datasource>\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n",
      "label": "Cabeçalho do Participante e ultima coleta",
      "sender": "ccem.projects@gmail.com",
      "sendingDate": "2018-04-06T22:49:17.763Z",
      "fieldCenter": [
        "SP",
        "RS",
        "RJ",
        "ES"
      ],
      "dataSources": [{
          "key": "cabeçalho",
          "dataSource": "Participant",
          "label": "Cabeçalho do Participante",
          "result": []
        },
        {
          "filters": {
            "acronym": "CSJ",
            "category": "C0",
            "statusHistory": {
              "name": "FINALIZED",
              "position": -1
            }
          },
          "key": "Status finalizado",
          "dataSource": "Activity",
          "label": "Ultima coleta",
          "result": []
        }
      ]
    },
    {
      "_id": {
        "$oid": "5ac804bd787e4f00e9a91da1"
      },
      "template": "<otus-datasource></otus-datasource>\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n",
      "label": "Cabeçalho do Participante e ultima coleta",
      "sender": "ccem.projects@gmail.com",
      "sendingDate": "2018-04-06T23:37:33.518Z",
      "fieldCenter": [
        "SP",
        "RS"
      ],
      "dataSources": [{
          "key": "cabeçalho",
          "dataSource": "Participant",
          "label": "Cabeçalho do Participante",
          "result": []
        },
        {
          "filters": {
            "acronym": "CSJ",
            "category": "C0",
            "statusHistory": {
              "name": "FINALIZED",
              "position": -1
            }
          },
          "key": "Status finalizado",
          "dataSource": "Activity",
          "label": "Ultima coleta",
          "result": []
        }
      ]
    }
  ];

  var Mock = {};
  var ctrl;
  var question = {};
  var element, scope;
  var component = {};
  var $controller;
  var mockReports;
  var mockRemoveOption;
  var mockUpdateOption;
  var $componentController;
  var mockGetReportList;
  var injections;

  beforeEach(angular.mock.module('otusDomain'));

  beforeEach(inject(function(_$injector_, _$rootScope_, _$compile_, _$controller_, $templateCache, $q) {
    /* Injectable mocks */


    injections = {
      ReportManagerService: _$injector_.get('ReportManagerService'),
      $http: _$injector_.get('$http'),
      $mdDialog: _$injector_.get('$mdDialog'),
      OtusRestResourceService: _$injector_.get('OtusRestResourceService'),
      $mdToast: _$injector_.get('$mdToast')
    };
    mockReport(_$injector_);

    $templateCache.put('app/project/report/report-manager-template.html', TEMPLATE);

    // mockControllerErrors(_$controller_, injections, $q);
    mockController(_$controller_, injections, $q);

    scope = _$rootScope_.$new();
    element = angular.element('<report-manager flex="80"></report-manager>');
    component = _$compile_(element)(scope);
    scope.$digest();
  }));

  describe('Test render report component', function() {
    it('should render the component', function() {
      expect(element[0]).toEqual(component[0]);

    });
  });

  describe("Test for component controller", function() {
    var reports = [];
    beforeEach(function() {
    // console.log($controller);
    spyOn($controller, 'exportReport');
    $controller.exportReport(Mock.report);
    });

    it("should call getReportList method", function() {
      expect($controller.$onInit).toBeDefined();
      expect(injections.ReportManagerService.getReportList()).toBeDefined();
      expect($controller.reports).toEqual($controller.reportsOld);
      expect($controller.ready).toEqual(true);
    });

    it("should call uploadReport method", function() {
      expect($controller.uploadReport).toBeDefined();
      expect(injections.ReportManagerService.uploadReport(Mock.report)).toBeDefined();
    });

    it("should call updateReport method", function() {
      expect($controller.updateReport).toBeDefined();
      expect(injections.ReportManagerService.updateReport(reportList)).toBeDefined();
    });

    it("should call exportReport method", function() {
      expect($controller.exportReport).toBeDefined();
      expect($controller.exportReport).toHaveBeenCalledWith(Mock.report);
    });

    it("should call deleteReport method", function() {
      expect($controller.deleteReport).toBeDefined();
      expect(injections.ReportManagerService.deleteReport(Mock.report)).toBeDefined();
    });
  });

  function mockController(_$controller_, injections, $q) {
    $controller = _$controller_('reportManagerController', injections);
    $controller.$onInit();

    spyOn(injections.ReportManagerService, "getReportList").and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve(reportList);
      return deferred.promise;
    });
    spyOn(injections.ReportManagerService, "uploadReport").and.callFake(function(file) {
      var deferred = $q.defer();
      if (file) {
        deferred.resolve(reportList);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });
    spyOn(injections.ReportManagerService, "updateReport").and.callFake(function(file) {
      var deferred = $q.defer();
      if (file) {
        deferred.resolve(reportList);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });
    spyOn(injections.ReportManagerService, "deleteReport").and.callFake(function(file) {
      var deferred = $q.defer();
      if (file) {
        deferred.resolve(reportData);
      } else {
        deferred.reject();
      }
      return deferred.promise;
    });

    spyOn(injections.$mdDialog, "show").and.callFake(function() {
      var deferred = $q.defer();
      deferred.resolve();
      return deferred.promise;
    });

    injections.ReportManagerService.getReportList(true);
    $controller.$onInit();
    $controller.updateReport(reportList);
    $controller.updateReport();
    $controller.uploadReport.callback(Mock.report);
    $controller.uploadReport.callback();
    $controller.exportReport(Mock.report);
    $controller.deleteReport(Mock.report);
    $controller.deleteReport();
    mockReports = $controller.reports;

  }



  function mockReport($injetor) {
    Mock.reportFactory = $injetor.get('ReportFactory');
    Mock.report = Mock.reportFactory.create(reportData);

  }

});
