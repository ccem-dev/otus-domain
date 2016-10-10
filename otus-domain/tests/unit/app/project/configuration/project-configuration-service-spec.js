describe('project configuration service', function() {
    var Mock = {};
    var service,
        $injector,
        $q,
        $http;

    beforeEach(function() {
        module('otusDomain');

        inject(function(_$injector_, _$q_) {
            $q = _$q_;
            $injector = _$injector_;
            deferred = $q.defer(); //_$q_.defer();
            service = $injector.get('otusjs.otus-domain.project.configuration.ProjectConfigurationService', {
              'OtusRestResourceService':mockOtusRestResourceService($injector),
              '$q': $q
            });
        });

    });

    /* Participant Register Fetcher */
    //fetchParticipantRegisterConfiguration
    it('should', function() {
      console.log('stay');
    });
    //updateParticipantRegisterConfiguration
    it('just should', function() {
    });


    /* Visual Identity */
    //fetchProjectsVisualIdentity
    //updateVisualIdentityConfiguration
    function mockOtusRestResourceService($injector){
      Mock.OtusRestResourceService = $injector.get('OtusRestResourceService');
    }
});
