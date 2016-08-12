describe('uploadTool', function() {
    var Mock = {};
    var directive,
        element,
        $compile,
        $rootScope,
        $injector;

    beforeEach(function() {
        module('otusDomain.project');

        inject(function(_$compile_, _$rootScope_, _$injector_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $injector = _$injector_;

            mockUploadToolService($injector);
        });

        element = $compile('<span upload-tool></span>')($rootScope);
        $rootScope.$digest();
    });

    describe('parameters passing',  function() {

      beforeEach(function() {
        spyOn(Mock.UploadToolService, 'uploadTypeResolver');

      });
      it('should call the type resolver', function() {
        element = $compile("<button upload-tool type='image'></button>")($rootScope);
        element[0].click();
        expect(Mock.UploadToolService.uploadTypeResolver).toHaveBeenCalled();
      });

      it('should call the service with the parameters passed through template',function() {
        element = $compile("<button upload-tool type='image'></button>")($rootScope);
        element[0].click();
        expect(Mock.UploadToolService.uploadTypeResolver).toHaveBeenCalledWith('image');
      });

      it('should accept multiple formats as parameters', function() {
        element = $compile("<button upload-tool type='image, json'></button>")($rootScope);
        element[0].click();
        expect(Mock.UploadToolService.uploadTypeResolver).toHaveBeenCalledWith('image, json');
      });

    });


    function mockUploadToolService($injector) {
      Mock.UploadToolService = $injector.get('otusjs.otus-domain.project.UploadToolService');
      return Mock.UploadToolService;
    }

});
