describe('SurveyTemplateTranslateService', function () {
  var Mock = {};
  var service;

  beforeEach(function () {
    mockValues();
    mockInjections();
    angular.mock.module('otusDomain.dashboard', function ($provide) {
      $provide.value('$i18next', Mock.$i18next);
    });
  });

  beforeEach(function () {
    inject(function (_$injector_) {
      service = _$injector_.get('otusDomain.dashboard.business.SurveyTemplateTranslateService');
    });
  });

  it('should to be defined', function () {
    expect(service.translate).toBeDefined();
  });

  it('when method translate is call then should translated question type', function () {
    var result = service.translate(Mock.dicionary);

    // TODO:
  });

  function mockInjections() {
    Mock.$i18next = {
      t: function () { }
    }
  }

  function mockValues() {
    Mock.dicionary = [
      {
        "acronym": "CSJ",
        "objectType": "SingleSelectionQuestion",
        "extractionID": "CSJC1",
        "label": "01. O(A) Sr(a) tem diabetes?",
        "metadata": [
          "Não quer responder(.Q)",
          "Não sabe(.S)",
          "Não se aplica(.A)",
          "Não há dados(.F)"
        ],
        "validationTypes": [
          {
            "name": "mandatory",
            "value": true
          }
        ],
        "extractionValues": [
          { "value": "1", "label": "Sim" },
          { "value": "0", "label": "Não" }
        ]
      },
      {
        "acronym": "CSJ",
        "objectType": "TextQuestion",
        "extractionID": "CSJC9dqou",
        "label": "Outra (especifique):",
        "metadata": [
          "Não quer responder(.Q)",
          "Não sabe(.S)",
          "Não se aplica(.A)",
          "Não há dados(.F)"
        ],
        "validationTypes": [
          {
            "name": "mandatory",
            "value": true
          }
        ], "extractionValues": []
      }
    ];
  }

});
