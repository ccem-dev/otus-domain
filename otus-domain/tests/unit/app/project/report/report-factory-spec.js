describe('Report Factory', function () {
  var Mock = {};
  var factory;

  beforeEach(angular.mock.module('otusDomain.dashboard'));

  beforeEach(inject(function (_$injector_, $q) {
    mockFactory(_$injector_);
  }));

  describe('The creation method', function () {
    var reportInfo;
    var report;
    beforeEach(function () {
      reportInfo = {
        label: 'Some Report',
        template: 'Some Template'
      };

      report = factory.create(reportInfo);

    });

    it('should keep creation object properties', function () {
      expect(report.label).toEqual(reportInfo.label);
      expect(report.template).toEqual(reportInfo.template);
    });
  });

  describe('the fromHtmlFile method', function () {
    var reportFromHtml;

    beforeEach(function () {
      mockHtmlFile();
      reportFromHtml = factory.fromHtmlFile(Mock.htmlFile);
    });

    it('should create a report', function () {
      expect(reportFromHtml.label).toEqual('Cabeçalho do Participante e ultima coleta');
    });
  });

  describe('the report public methods', function () {
    var reportInfo;
    var report;
    beforeEach(function () {
      reportInfo = {
        _id : {
          $oid: "5ac7f96d787e4f00e9a91d9d"
        },
        label: 'Some Report',
        template: 'Some Template'
      };

      report = factory.create(reportInfo);

    });

    it('should refresh but keep unaltered fields', function () {
      var newInfo = {label: 'Another Label'};
      report.refresh(newInfo);

      expect(report.label).toEqual(newInfo.label);
      expect(report.template).toEqual(reportInfo.template);
    });

    it('should export to the same html file', function () {
      var htmlFile;
      var reportFromHtml;
      expect(function() {
        reportFromHtml = factory.fromHtmlFile(htmlFile);
        return reportFromHtml;
      }).toThrow();

    });


    it('export to json the same properties as the original report info', function () {
      expect(JSON.parse(JSON.stringify(report))).not.toEqual(reportInfo);
    });

    it('export to json the same properties as the original report info', function () {
      expect(report.getId()).toEqual(report._id.$oid)
    });

    it('should reload to previous saved version', function(){
      report.label = 'another label';
      report.reload();
      expect(report.label).toEqual(reportInfo.label);
    });
  });


  function mockFactory(_$injector_) {
    factory = _$injector_.get('ReportFactory');
  }

  function mockHtmlFile(){
    Mock.htmlFile = "<otus-datasource>\n{\"template\":\"\",\"label\":\"Cabeçalho do Participante e ultima coleta\",\"fieldCenter\":[\"SP\"],\"dataSources\":[{\"key\":\"cabeçalho\",\"dataSource\":\"Participant\",\"label\":\"Cabeçalho do Participante\",\"result\":[]},{\"filters\":{\"acronym\":\"CSJ\",\"category\":\"C0\",\"statusHistory\":{\"name\":\"FINALIZED\",\"position\":-1}},\"key\":\"Status finalizado\",\"dataSource\":\"Activity\",\"label\":\"Ultima coleta\",\"result\":[]}]}\n</otus-datasource>\n<otus-script>\n  {{data.imc = 15.4}}\n  {{data.sexo = \"\"}}\n  {{\n    required(\"sexo\", data.sexo, \"é um campo obrigatório\")\n  }}\n  {{\n    required(\"imc\", data.imc, \"é um campo obrigatório\")\n  }}\n  {{}}\n</otus-script>\n\n<div layout-margin layout-padding>\n  <span ng-style=\"style.participant\">Participante: {{ds.participant[0].name}}</span><br>\n  <span ng-style=\"style.imc\">IMC do Participante: {{data.imc}}</span><br>\n  <span ng-style=\"style.sexo\">Sexo: {{data.sexo}}</span><br>\n</div>\n";
    return Mock.htmlFile;
  }
});
