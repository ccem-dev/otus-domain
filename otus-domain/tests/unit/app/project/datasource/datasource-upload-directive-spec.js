xdescribe('Datasource Upload Directive', function() {
  var Mock = {};
  var directive,
    element,
    $compile,
    $rootScope,
    $injector,
    scope;

  beforeEach(function () {
    angular.mock.module('otusDomain.dashboard');
  });

  beforeEach(function() {
    inject(function(_$compile_, _$rootScope_, _$injector_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $injector = _$injector_;

      Mock.uploadConfig = {
        'callback': function() {},
        'type': 'csv'
      };

      mockUploadToolService($injector);
    });
  });

  describe('parameters passing - ', function() {
    beforeEach(function() {
      spyOn(Mock.Upload, 'action');
      scope = $rootScope.$new();
      scope.datasourceUpload = Mock.uploadConfig;

    });

    it('should call the type resolver', function() {
      var $element = '<button datasource-upload="$ctrl.action"></button>';
      element = $compile($element)(scope);
      scope.$apply();
      element[0].click();
      expect(Mock.Upload.action).toHaveBeenCalled();
    });

    // it('should accept formats a parameter', function() {
    //   scope.uploadConfig.type = 'image, json';
    //   element = $compile('<button datasource-upload="$ctrl.action"></button>')(scope);
    //   element[0].click();
    //   expect(Mock.Upload.action).toHaveBeenCalledWith('csv');
    // });
    //
    // it('should accept any format when no format type is given', function() {
    //   scope.uploadConfig.type = '';
    //   element = $compile('<button datasource-upload="$ctrl.action"></button>')(scope);
    //   element[0].click();
    //   expect(Mock.Upload.action).toHaveBeenCalledWith('any');
    // });
  });



  function mockUploadToolService($injector) {
    Mock.Upload = $injector.get('DatasourceUpload');
    return Mock.Upload;
  }
});