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
        deferred;

    beforeEach(module('otusDomain'));
    beforeEach(inject(function(_$componentController_, _$q_, _$rootScope_, _$mdToast_, _$injector_) {
        $componentController = _$componentController_;
        $mdToast = _$mdToast_;
        $q = _$q_;
        scope = _$rootScope_.$new();

        var Bindings = {
            $scope: scope
        };
        $injector = _$injector_;
        var Injections = {
            '$q': $q,
            'ProjectConfigurationService': mockProjectConfigurationService($injector),
            '$mdToast': $mdToast
        };

        ctrl = $componentController('otusSurveysManager', Injections, Bindings);
    }));

    describe('the controller initialization', function() {
        beforeEach(function() {
            deferred = $q.defer();
            spyOn(Mock.ProjectConfigurationService, 'fetchSurveysManagerConfiguration').and.returnValue(deferred.promise);

        });
        it('should initialize the survey list', function() {
            surveyList = [{
                'sender': "brenoscheffer@gmail.com",
                'sendingDate': "Oct 6, 2016 10:56:46 PM",
                'surveyFormType': "FORM_INTERVIEW",
                'surveyTemplate': {
                    'identity': {
                        'name': 'Toda vez que eu viajava pela estrada de ouro fino',
                        'acronym': 'ZEZE'
                    }
                }
          }, {
                'sender': "brenoscheffer@gmail.com",
                'sendingDate': "Oct 6, 2016 10:56:46 PM",
                'surveyFormType': "PROFILE",
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
                'surveyTemplate': {
                    'identity': {
                        'name': 'INT',
                        'acronym': 'Integração'
                    }
                }
          }];
            deferred.resolve(surveyList);
            var result;
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration().then(function(returnFromPromise) {
                result = returnFromPromise;
                expect(result).toBeDefined(surveyList);
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

    describe('some uploads', function() {
        it('should do nothing when a wrong file format is given', function() {
            Mock.ProjectConfigurationService.fetchSurveysManagerConfiguration = {};
            ctrl.uploadConfig = {
                type: 'notJson'
            };
            expect(ctrl.uploadedObject).toEqual({});
        });
    });


    function mockProjectConfigurationService($injector) {
        Mock.ProjectConfigurationService = $injector.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService');
        return Mock.ProjectConfigurationService;
    }

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.configuration.UploadToolService');
        return Mock.UploadToolService;
    }
});
