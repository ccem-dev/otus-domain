describe('project visual identity component', function() {
    var Mock = {};
    var directive,
        element,
        $compile,
        $rootScope,
        $injector,
        scope;

    beforeEach(function() {
        module('otusDomain.project');

        inject(function(_$compile_, _$rootScope_, _$injector_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;

            $injector = _$injector_;
            mockUploadToolService($injector);

            scope = $rootScope.$new();
            element = angular.element('<otus-visual-identity></otus-visual-identity>');
            $compile(element)(scope);
        });
    });

    it('just should', function(){
            
    });

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.UploadToolService');
        return Mock.UploadToolService;
    }

});
