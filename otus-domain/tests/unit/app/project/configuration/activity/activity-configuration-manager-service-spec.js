describe("Activity Configuration Manager Service Test", function () {
  var service;
  var SURVEY = {
    'sender': "brenoscheffer@gmail.com",
    'sendingDate': "Oct 6, 2016 10:56:46 PM",
    'surveyFormType': "FORM_INTERVIEW",
    'version': 1,
    'isDiscarded': false,
    'surveyTemplate': {
      'identity': {
        'name': 'DIARIO DE SONO',
        'acronym': 'DSO',
      }
    }
  }

  beforeEach(function () {
    angular.mock.module('otusDomain.dashboard');

    inject(function (_ActivityConfigurationManagerService_) {
      // service = _$injector_.get("ActivityConfigurationManagerService");
      service = _ActivityConfigurationManagerService_;
    });
  });

  it('should select survey to settings', function () {
    service.$onInit();
    expect(service.selectSurveyToSettings).toBeNull();
    service.setSurveyToSettings(SURVEY);
    expect(service.getSurveyToSettings()).toEqual(SURVEY);
  });

  it('should return survey to settings', function () {
    service.$onInit();
    service.selectSurveyToSettings = undefined;
    expect(service.getSurveyToSettings()).toBeNull();
  });

})
