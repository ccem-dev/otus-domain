describe('project visual identity component', function() {
    var Mock = {};
    var $componentController,
        $injector;

    beforeEach(function() {
        module('otusDomain.project');

        inject(function(_$componentController_, _$injector_) {
            $componentController = _$componentController_;
            $injector = _$injector_;
            mockUploadToolService($injector);
            mockmdToast($injector);
        });
    });

    it('just should', function() {
        // var bindings = {hero: {name: 'Wolverine'}};
        var ctrl = $componentController('otusVisualIdentity');
    });

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.UploadToolService');
        return Mock.UploadToolService;
    }

    function mockmdToast($injector) {
        Mock.$mdToast = $injector.get('$mdToast');
        return Mock.$mdToast;
    }
});
