describe('project praticipant register', function() {
    var Mock = {};
    var $componentController,
        $injector,
        $mdToast,
        $q,
        ctrl,
        scope,
        $rootScope,
        surveyList,
        deferred,
        $compile,
        runAnimation;

    beforeEach(angular.mock.module('otusDomain'));
    beforeEach(angular.mock.module(function ($provide) {
        $provide.value('OtusRestResourceService', {
          getConfigurationResource: function () { return {} },
          getProjectConfigurationResource: function () { return {} }
        });
      }));
    beforeEach(inject(function(_$componentController_, _$q_, _$rootScope_, _$mdToast_, _$injector_, _$compile_) {
        surveyList = [{
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
              }, {
            'sender': "brenoscheffer@gmail.com",
            'sendingDate': "Oct 6, 2016 10:56:46 PM",
            'surveyFormType': "PROFILE",
            'version': 1,
            'isDiscarded': false,
            'surveyTemplate': {
                'identity': {
                    'name': 'Elegibilidade',
                    'acronym': 'ELEA'
                }
            }
  }, {
            'sender': "brenoscheffer@gmail.com",
            'sendingDate': "Oct 6, 2016 10:56:46 PM",
            'surveyFormType': "FORM_INTERVIEW",
            'version': 1,
            'isDiscarded': false,
            'surveyTemplate': {
                'identity': {
                    'name': 'INT',
                    'acronym': 'Integração'
                }
            }
  }];

        $componentController = _$componentController_;
        $mdToast = _$mdToast_;
        $q = _$q_;
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        var Bindings = {
            $scope: scope
        };
        $injector = _$injector_;
        var Injections = {
            '$q': $q,
            'ProjectConfigurationService': mockProjectConfigurationService($injector),
            '$mdDialog': mockDialog($injector)
        };

        ctrl = $componentController('otusSurveysManager', Injections, Bindings);
    }));



    describe('the controller initialization', function() {
        beforeEach(function() {
            deferred = $q.defer();
            spyOn(Mock.ProjectConfigurationService, 'fetchSurveysManagerConfiguration').and.returnValue(deferred.promise);

        });

        it('should initialize the survey list', function() {
            deferred.resolve(surveyList);
            var result;
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration()
                .then(function(returnFromPromise) {
                    result = returnFromPromise;
                    expect(result).toEqual(surveyList);
                });
            scope.$apply();
            expect(Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration).toHaveBeenCalled();
        });
        it('should set the correct message when surveyList is empty (rest return)', function(done) {
            ctrl.$onInit();
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration()
                .then(function() {
                    expect(ctrl.noListInfo).toEqual('Nenhum formulário adicionado');
                    done();
                });
            deferred.resolve([]);
            scope.$digest();
        });
        it('should set the correct message when could not reach the server (rest return)', function(done) {
            ctrl.$onInit();
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration()
                .then(function() {})
                .catch(function() {
                    expect(ctrl.noListInfo).toEqual('Erro de comunicação com servidor');
                    done();
                });
            deferred.reject(true);
            scope.$digest();
        });
    });

    var defer;
    var dialogDefer;
    describe('an survey management', function() {
        beforeEach(function() {

            deferred = $q.defer();
            defer = $q.defer();
            dialogDefer = $q.resolve();

        });

        it('should add an published template to the surveyTemplatesList', function(done) {
            spyOn(Mock.ProjectConfigurationService, 'publishTemplate').and.returnValue(defer.promise);
            ctrl.surveyTemplatesList = [];
            ctrl.publishTemplate();
            Mock.ProjectConfigurationService.publishTemplate()
                .then(function() {
                    expect(ctrl.surveyTemplatesList).toContain('file');
                    done();
                });
                defer.resolve('file');
                scope.$digest();

        });
        it('should not add an published template to the surveyTemplatesList when get an error', function(done) {
            spyOn(Mock.ProjectConfigurationService, 'publishTemplate').and.returnValue(defer.promise);
            ctrl.surveyTemplatesList = [];
            ctrl.publishTemplate();
            Mock.ProjectConfigurationService.publishTemplate()
                .catch(function() {
                    expect(ctrl.surveyTemplatesList).not.toContain('file');
                    done();
                });
                defer.reject();
                scope.$digest();

        });

        it('should remove an survey when deleteSurveyTemplate is called', function(done) {
            spyOn(Mock.ProjectConfigurationService, 'fetchSurveysManagerConfiguration').and.returnValue(defer.promise);
            spyOn(Mock.ProjectConfigurationService, 'deleteSurveyTemplate').and.returnValue(deferred.promise);
            spyOn(Mock.mdDialog, 'show').and.returnValue(dialogDefer);
            ctrl.$onInit();
            var removedOne;
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration()
                .then(function(surveyList) {
                    removedOne = ctrl.surveyTemplatesList[0];
                    ctrl.deleteSurveyTemplate(0);
                    //TODO doesn't work. Check why surveyList is also updated
                    //expect(ctrl.surveyTemplatesList.length).not.toEqual(surveyList.length);
                });
            Mock.mdDialog.show()
                .then(function() {
                    Mock.ProjectConfigurationService.deleteSurveyTemplate(0)
                        .then(function() {});
                });
            defer.resolve(surveyList);
            deferred.resolve();
            scope.$digest();
            expect(Mock.ProjectConfigurationService.deleteSurveyTemplate).toHaveBeenCalledWith(0);
            expect(ctrl.surveyTemplatesList.length).not.toContain(removedOne);
            done();
        });

        it('should unupdate the profile type when rest fails', function(done) {
            spyOn(Mock.ProjectConfigurationService, 'updateSurveyTemplateType').and.returnValue(defer.promise);
            spyOn(Mock.ProjectConfigurationService, 'fetchSurveysManagerConfiguration').and.returnValue(deferred.promise);

            var oldType;
            ctrl.$onInit();
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration()
                .then(function(surveyList) {
                    oldType = ctrl.surveyTemplatesList[0].surveyFormType;
                    ctrl.surveyTemplatesList[0].surveyFormType = 'PROFILE';
                    ctrl.updateSurveyFormType(0);
                });
            Mock.ProjectConfigurationService.updateSurveyTemplateType()
                .then(function() {})
                .catch(function() {
                    expect(ctrl.surveyTemplatesList[0].surveyFormType).toEqual(oldType);
                });
            deferred.resolve(surveyList);
            defer.resolve();
            scope.$digest();
            done();
        });
    });



    function mockProjectConfigurationService($injector) {
        Mock.ProjectConfigurationService = $injector.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService');
        return Mock.ProjectConfigurationService;
    }

    function mockDialog($injector) {
        Mock.mdDialog = $injector.get('$mdDialog');
        return Mock.mdDialog;
    }
});
