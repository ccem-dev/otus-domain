describe('Report Manager Service', function () {
  var Mock = {};
  var Injections = {};
  var service;

  beforeEach(function () {
    angular.mock.module('otusDomain.dashboard', function ($provide) {
      $provide.value('ReportRestService', mockReportRestService());
    })
  });

  beforeEach(inject(function ($injector, $q) {
    Injections = {
      ReportRestService: $injector.get('ReportRestService'),
      ReportFactory: mockReportFactory($injector),
      $q: mockQ($q)
    };

    mockService($injector, Injections);
    mockReportData();
    mockReportList();
    mockHtmlFile();
  }));


  describe('the getReportList method', function () {
    it('should work for empty list', function () {
      spyOn(Mock.ReportRestService, "list")
        .and.returnValue(Promise.resolve({data: []}));
      service.getReportList()
        .then(function (data) {
          expect(data).toEqual([]);
        });
    });

    it('should build a Report Array using the ReportFactory', function () {
      spyOn(Mock.ReportFactory, "create")
        .and.callThrough();
      service.getReportList()
        .then(function (data) {
          expect(Mock.ReportFactory.create).toHaveBeenCalledWith(Mock.reportList[0]);
        })
        .catch(function(){
          //fails test if fails promise
          expect(null).not.toBe(null);
        });;
    });

    it('should pass any error up', function () {
      spyOn(Mock.ReportRestService, "list")
        .and.returnValue(Promise.reject('err'));
      service.getReportList()
        .then(function(){
          //fails test if passes promise
          expect(null).not.toBe(null);
        })
        .catch(function (err) {
          expect(err).toEqual('err');
        });
    });
  });

  describe('the uploadReport method', function () {

    it('should create a report and upload', function () {
      spyOn(Mock.ReportFactory, "fromHtmlFile")
        .and.returnValue(Mock.Report);

      spyOn(Mock.Report, 'refresh').and.callThrough();

      service.uploadReport(Mock.htmlFile)
        .then(function (response) {
          expect(Mock.ReportFactory.fromHtmlFile).toHaveBeenCalledWith(Mock.htmlFile)
        })
        .catch(function(){
          //fails test if fails promise
          expect(null).not.toBe(null);
        });
    });

    it('should calç refresh of an uploaded report', function () {
      spyOn(Mock.ReportFactory, "fromHtmlFile")
        .and.returnValue(Mock.Report);

      spyOn(Mock.Report, 'refresh').and.callThrough();

      service.uploadReport(Mock.htmlFile)
        .then(function (response) {
          expect(Mock.Report.refresh).toHaveBeenCalledWith(response);
        })
        .catch(function(){
          //fails test if fails promise
          expect(null).not.toBe(null);
        });
    });
  });
  describe('the updateReport method', function () {
    it('should calç refresh of an updated report', function () {
      spyOn(Mock.Report, 'refresh').and.callThrough();

      service.updateReport(Mock.Report)
        .then(function (response) {
          expect(Mock.Report.refresh).toHaveBeenCalledWith(response);
        })
        .catch(function(){
          //fails test if fails promise
          expect(null).not.toBe(null);
        });
    });
  });

  //mock functions
  function mockService(_$injector_, Injections) {
    service = _$injector_.get('ReportManagerService', Injections);
  }

  function mockReportFactory(_$injector_) {
    Mock.ReportFactory = _$injector_.get('ReportFactory');
    Mock.Report = Mock.ReportFactory.create(Mock.reportData);
    return Mock.ReportFactory;
  }

  function mockQ($q) {
    Mock.$q = $q;
    return Mock.$q;
  }

  function mockReportRestService() {
    Mock.ReportRestService = {
      initialize: function () {
      },
      create: function (report) {
        report._id = {$oid: 'someid'};
        report.sender = 'sender@sendermail.com';
        return Promise.resolve({data:report});
      },
      list: function () {
        return Promise.resolve({data: mockReportList()});
      },
      update: function (report) {
        return Promise.resolve({data:report});
      },
      remove: function () {
        return Promise.resolve({data:true});
      }
    };
    return Mock.ReportRestService;
  }


  function mockReportData() {
    Mock.reportData = {
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
    return Mock.reportData;
  }

  function mockHtmlFile(){
    Mock.htmlFile = "<otus-datasource>\n{\"dataSources\":[{\"key\":\"cabeçalho\",\"dataSource\":\"Participant\",\"label\":\"RELATÓRIO COM LABEL MUITO GRANDE VEJA VOCÊ QUE BAITA LABELZÃO!!!!!\",\"result\":[]},{\"filters\":{\"acronym\":\"CSJ\",\"category\":\"C0\",\"statusHistory\":{\"name\":\"FINALIZED\",\"position\":-1}},\"key\":\"Status finalizado\",\"dataSource\":\"Activity\",\"label\":\"Ultima coleta\",\"result\":[]}],\"fieldCenter\":[],\"label\":\"Cabeçalho do Participante e ultima coleta\",\"template\":\"\"}\n</otus-datasource>\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n";
    return Mock.htmlFile;
  }

  function mockReportList() {
    Mock.reportList = [{
      "_id": {"$oid": "5ad10ca99106d0026cfdfe5e"},
      "template": "\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n",
      "label": "Cabeçalho do Participante e ultima coleta",
      "sender": "brenoscheffer@gmail.com",
      "sendingDate": "2018-04-13T20:01:45.172Z",
      "fieldCenter": [],
      "dataSources": [{
        "key": "cabeçalho",
        "dataSource": "Participant",
        "label": "RELATÓRIO COM LABEL MUITO GRANDE VEJA VOCÊ QUE BAITA LABELZÃO!!!!!",
        "result": []
      }, {
        "filters": {"acronym": "CSJ", "category": "C0", "statusHistory": {"name": "FINALIZED", "position": -1}},
        "key": "Status finalizado",
        "dataSource": "Activity",
        "label": "Ultima coleta",
        "result": []
      }]
    }, {
      "_id": {"$oid": "5ad10ced9106d0026cfdfe5f"},
      "template": "\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n",
      "label": "RELATÓRIO COM LABEL MUITO GRANDE VEJA VOCÊ QUE BAITA LABELZÃO!!!!!",
      "sender": "brenoscheffer@gmail.com",
      "sendingDate": "2018-04-13T20:02:53.857Z",
      "fieldCenter": [],
      "dataSources": [{
        "key": "cabeçalho",
        "dataSource": "Participant",
        "label": "RELATÓRIO COM LABEL MUITO GRANDE VEJA VOCÊ QUE BAITA LABELZÃO!!!!!",
        "result": []
      }, {
        "filters": {"acronym": "CSJ", "category": "C0", "statusHistory": {"name": "FINALIZED", "position": -1}},
        "key": "Status finalizado",
        "dataSource": "Activity",
        "label": "Ultima coleta",
        "result": []
      }]
    }, {
      "_id": {"$oid": "5ad10cf29106d0026cfdfe60"},
      "template": "\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n",
      "label": "RELATÓRIOCOMLABELMUITOGRANDEVEJAVOCÊQUEBAITALABELZÃO",
      "sender": "brenoscheffer@gmail.com",
      "sendingDate": "2018-04-13T20:02:58.069Z",
      "fieldCenter": [],
      "dataSources": [{
        "key": "cabeçalho",
        "dataSource": "Participant",
        "label": "RELATÓRIOCOMLABELMUITOGRANDEVEJAVOCÊQUEBAITALABELZÃO!!!!!",
        "result": []
      }, {
        "filters": {"acronym": "CSJ", "category": "C0", "statusHistory": {"name": "FINALIZED", "position": -1}},
        "key": "Status finalizado",
        "dataSource": "Activity",
        "label": "Ultima coleta",
        "result": []
      }]
    }];
    return Mock.reportList;
  }


});
