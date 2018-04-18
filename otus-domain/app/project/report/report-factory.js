(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .factory('ReportFactory', factory);

  function factory() {
    var self = this;

    self.create = create;
    self.fromHtmlFile = fromHtmlFile;

    function create(reportData) {
      return new Report(reportData);
    }

    function fromHtmlFile(file) {
      try {
        return new Report(extractReport(file));
      } catch (err) {
        throw 'Erro ao processar arquivo';
      }
    }

    return self;
  }

  function extractReport(file) {
    function findTextInTheMiddleOfTags(text, tagOpen, tagClose) {
      return text.substring(text.lastIndexOf(tagOpen) + tagOpen.length, text.lastIndexOf(tagClose));
    }

    function getReportData(text) {
      var dsText = findTextInTheMiddleOfTags(text, "<otus-datasource>", "</otus-datasource>");
      var datasource = JSON.parse(dsText);
      datasource.template = text.replace("<otus-datasource>" + dsText + "</otus-datasource>", '');
      return datasource;
    }

    return getReportData(file);
  }

  function Report(reportData) {
    var self = this;
    var _reportData = reportData;

    var basicReportSchema = Object.freeze({
      dataSources: undefined,
      fieldCenter: undefined,
      label: undefined,
      template: undefined
    });

    self.sendingDate = '';

    onInit(reportData);

    self.getId = getId;
    self.refresh = refresh;
    self.reload = reload;
    self.toJSON = toJSON;
    self.toHtml = toHtml;


    function onInit(reportData) {
      // Object.assign(destine, [sources]);
      // Last source overrides common attributes
      Object.assign(self, basicReportSchema, reportData);
    }

    function refresh(data) {
      _reportData = data;
      angular.extend(self, data);
    }

    function reload() {
      angular.extend(self, _reportData);
    }

    function toJSON() {
      var json = {};

      Object.keys(_reportData).forEach(function (key) {
        json[key] = self[key];
      });

      json.sendingDate = self.sendingDate ? self.sendingDate : new Date();

      return json;
    }

    function toHtml() {
      var htmlJson = {};

      Object.keys(basicReportSchema).forEach(function (key) {
        htmlJson[key] = self[key];
      });

      htmlJson.template = '';
      return '<otus-datasource>\n' + JSON.stringify(htmlJson) + '\n</otus-datasource>' + self.template;
    }

    function getId() {
      return self._id.$oid;
    }

    return self;
  }
}());
