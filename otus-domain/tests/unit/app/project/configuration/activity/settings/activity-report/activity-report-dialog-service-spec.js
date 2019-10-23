describe('ActivityReportDialogService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};


  beforeEach(() => {
    angular.mock.module('otusDomain.dashboard');

    //technique to introduce providers that the injection can't reach
    angular.mock.module('ngMaterial');
    angular.mock.module('otusDomain.rest');
    angular.mock.module('otus.client');

    angular.mock.inject(($injector) => {
      Injections.$mdDialog = $injector.get('$mdDialog');
      Injections.$q = $injector.get('$q');
      Injections.$mdToast = $injector.get('$mdToast');
      Injections.ProjectConfigurationService = $injector.get('otusDomain.rest.configuration.ProjectConfigurationService');
      service = $injector.get('ActivityReportDialogService');

      spyOn(Injections.$mdDialog, 'show')
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.loadActivityReport).toBeDefined();
  });

  it('loadActivityReportMethod_should', () => {
    let componentCtrl = getMockComponentCtrl();
    service.loadActivityReport(componentCtrl);
    expect(Injections.$mdDialog.show).toHaveBeenCalledTimes(1)
  });

  function getMockComponentCtrl (){
    return Mock.ComponentCtrl = {
      activityVersionsAvailable: [1, 2],
      currentSurvey:{surveyTemplate:{identity:{acronym: "ISG"}}},
      loadActivityReportList: () => []
    }
  }
});
