xdescribe('project configuration service', function() {
    var Mock = {};
    var service,
        $injector,
        $q;

    beforeEach(function() {
        module('otusDomain.project');

        inject(function(_$injector_, _$q_) {
            $q = _$q_;
            $injector = _$injector_;
            deferred = $q.defer(); //_$q_.defer();
            service = $injector.get('otusjs.otus-domain.project.ProjectConfigurationService');
            mockUploadToolService($injector);

        });
    });

    /* Participant Register Fetcher */
    it('just should', function() {                
    });


    /* Visual Identity */

});
