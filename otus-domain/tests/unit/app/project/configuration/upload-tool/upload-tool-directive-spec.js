describe('uploadTool', function() {
    var Mock = {};
    var directive,
        element,
        $compile,
        $rootScope,
        $injector,
        scope;

    beforeEach(function() {
        module('otusDomain.project.configuration');

        inject(function(_$compile_, _$rootScope_, _$injector_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $injector = _$injector_;

            mockUploadToolService($injector);
        });
    });

    describe('parameters passing - ', function() {

        beforeEach(function() {
            spyOn(Mock.UploadToolService, 'uploadTypeResolver');
            scope = $rootScope.$new();
            scope.uploadConfig = Mock.uploadConfig;

        });
        it('should call the type resolver', function() {
            var $element = '<button upload-tool="uploadConfig"></button>';
            element = $compile($element)(scope);
            scope.$apply();
            element[0].click();
            expect(Mock.UploadToolService.uploadTypeResolver).toHaveBeenCalled();
        });

        it('should call the service with the parameters passed through template', function() {
            scope.uploadConfig.type = 'image';
            element = $compile('<button upload-tool="uploadConfig" ></button>')(scope);
            element[0].click();
            expect(Mock.UploadToolService.uploadTypeResolver).toHaveBeenCalledWith('image');
        });

        it('should accept multiple formats as parameters', function() {
            scope.uploadConfig.type = 'image, json';
            element = $compile('<button upload-tool="uploadConfig"></button>')(scope);
            element[0].click();
            expect(Mock.UploadToolService.uploadTypeResolver).toHaveBeenCalledWith('image, json');
        });

        it('should accept any format when no format type is given', function() {
            scope.uploadConfig.type = '';
            element = $compile('<button upload-tool="uploadConfig"></button>')(scope);
            element[0].click();
            expect(Mock.UploadToolService.uploadTypeResolver).toHaveBeenCalledWith('any');
        });
    });

    Mock.uploadConfig = {
        'callback': function() {
            console.log('função de callback');
        },
        'type': 'image'
    };

    function mockUploadToolService($injector) {
        Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.configuration.UploadToolService');
        return Mock.UploadToolService;
    }

});
