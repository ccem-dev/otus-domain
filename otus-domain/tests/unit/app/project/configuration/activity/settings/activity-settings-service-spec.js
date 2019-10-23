describe('ActivitySettingsService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusDomain.dashboard');
    angular.mock.inject($injector => {
      service = $injector.get('ActivitySettingsService', Injections);
      Mock.jsonActivityReports = [Test.utils.data.activityReport, Test.utils.data.activityReport];
    });
  });

  it('serviceExistence_check', () => {
    expect(service).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(service.getActivityReports).toBeDefined();
  });

  it('should_Check_If_Gets_and_Returns_Multiple_Reports.', () => {
    let activityReports = service.getActivityReports(Mock.jsonActivityReports);
    expect(activityReports.length).toBe(2);
    expect(activityReports[1].objectType).toBe('ActivityReport');
  });
});