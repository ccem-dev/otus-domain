describe("Activity Configuration Manager Service Test", function () {
  var service;
  const PERMISSION = {
    "_id": "5bb3d8ebcc5fe80077b11616",
    "objectType": "ActivityAccessPermission",
    "version": 2,
    "acronym": "CSJ",
    "exclusiveDisjunction": [
      "pedro.silva@gmail.com"
    ]
  }

  const SURVEY = {
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
      service = _ActivityConfigurationManagerService_;
    });
  });

  it('should select survey', function () {
    service.$onInit();
    service.setSurveyInContext(SURVEY);
    expect(service.getSurveyOfContext()).toEqual(SURVEY);
  });

  it('should return survey', function () {
    service.$onInit();
    service.survey = null;
    expect(service.getSurveyOfContext()).toBeNull();
  });

  it('should select permission', function () {
    service.$onInit();
    service.setPermissionInContext(PERMISSION);
    expect(service.getPermissionOfContext()).toEqual(PERMISSION);
  });

  it('should return permission', function () {
    service.$onInit();
    service.permission = null;
    expect(service.getPermissionOfContext()).toBeNull();
  });

})
