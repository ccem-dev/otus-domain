xdescribe('ActivityReportDialogService_UnitTest_Suite', () => {
  let service;
  let Injections = [];
  let Mock = {};


  beforeEach(() => {

    angular.mock.module('otusDomain');
    angular.mock.module('otusDomain.dashboard');
    angular.mock.inject(($injector) => {
      // Injections.$mdDialog = $injector.get('$mdDialog');
      // Injections.$q = $injector.get('$q');
      // Injections.$mdToast = $injector.get('$mdToast');
      //Injections.ProjectConfigurationService = $injector.get('otusDomain.rest.configuration.ProjectConfigurationService');
      service = $injector.get('ActivityReportDialogService', Injections);
    });
  });

  it('serviceExistence_check', () => {
    console.log(service)
    expect(service).toBeDefined();
  });

  // it('serviceMethodsExistence_check', () => {
  //   expect(service.).toBeDefined();
  // });
  //
  // it('should ', () => { });
});
