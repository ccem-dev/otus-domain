describe('Datasource Upload Directive', function() {
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
    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;

      Mock.uploadConfig = {
        'callback': function(file) {return file},
        'type': 'csv'
      };

    });

  });

  describe('parameters passing - ', function() {
    beforeEach(function() {
      scope = $rootScope.$new();
      scope.datasourceUpload = Mock.uploadConfig;

      spyOn(scope.datasourceUpload, 'callback').and.callThrough();

    });

    it('should call the type resolver', function() {
      var $element = '<button datasource-upload="datasourceUpload"></button>';
      element = $compile($element)(scope);
      element[0].click();
      scope.$digest();

      expect(element).toBeDefined();
      expect(element.html()).toEqual('');
      expect(scope.datasourceUpload).toEqual(Mock.uploadConfig);
      expect(typeof(scope.datasourceUpload.callback)).toEqual('function');
      // toHaveBeenCalled();
    });

  });


});