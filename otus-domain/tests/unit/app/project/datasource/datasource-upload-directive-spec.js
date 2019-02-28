describe('Datasource Upload Directive', function() {
  var Mock = {};
  var FILE = 'fake1;extraction';
  var element,
    $compile,
    $rootScope,
    scope;


  beforeEach(function () {
    angular.mock.module('otusDomain.project.datasource');
  });

  beforeEach(function() {
    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;

      Mock.uploadConfig = {
        'callback': function (file) {return file},
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

    it('should call check', function() {
      element = angular.element( '<md-button datasource-upload="datasourceUpload"></md-button>');
      element = $compile(element)(scope);

      expect(element).toBeDefined();
      expect(scope.datasourceUpload).toEqual(Mock.uploadConfig);
      expect(typeof(scope.datasourceUpload.callback)).toEqual('function');
      expect(scope.datasourceUpload.type).toEqual('csv');
      expect(element.scope().datasourceUpload.callback(FILE)).toEqual(FILE);
      expect(scope.datasourceUpload.callback).toHaveBeenCalled();
      expect(Mock.uploadConfig.callback).toHaveBeenCalled();

    });

  });
});