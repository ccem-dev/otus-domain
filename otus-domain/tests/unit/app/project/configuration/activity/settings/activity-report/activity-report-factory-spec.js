describe('ActivityReportFactory_UnitTest_Suite', () => {
  let factory, activityReport;
  let Injections = [];
  let Mock = {};

  beforeEach(() => {
    angular.mock.module('otusDomain.dashboard');
    angular.mock.inject($injector => {
      //Injections. = $injector.get(' ');
      factory = $injector.get('ActivityReporFactory');
      Mock.activityReportData = Test.utils.data.activityReport;
      activityReport = factory.create(Mock.activityReportData);
    });
  });

  it('serviceExistence_check', () => {
    expect(factory).toBeDefined();
  });

  it('serviceMethodsExistence_check', () => {
    expect(factory.create).toBeDefined();
  });

  it('createMethod_should_build_instance_of_ActivityReport', () => {
    expect(activityReport.objectType).toBe('ActivityReport');
   });

  it('cancelUpdateVersion_should_return_values_from_original_version_list', () => {
    activityReport.versions = [1,2]
    expect(activityReport.versions.length).toBe(2)
    activityReport.cancelUpdateVersion()
    expect(activityReport.versions.length).toBe(1)
  });

  it('should ', () => {
    console.log(activityReport.versions);
    activityReport.updateCurrentVersions();
    expect((activityReport.getCurrentVersions())[0]).toBe(1)

  });
  //it('should ', () => { });
  //it('should ', () => { });
});
