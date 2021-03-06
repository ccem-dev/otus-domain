(function() {
  'use strict';

  angular
    .module('otusDomain.project.datasource')
    .directive('datasourceUpload', datasourceUpload);

  function datasourceUpload() {
    var ddo = {
      restrict: 'A',
      link: linkFunction,
      scope: {
        datasourceUpload: '='
      }
    };
    return ddo;

    function linkFunction($scope, $element) {
      var fileUploadElement;
      var uploadConfig = $scope.datasourceUpload;
      var callback = uploadConfig.callback || {};
      var uploadType = uploadConfig.type || 'any';

      $element.on('click', function() {
        fileUploadElement = _createInput();
        fileUploadElement.click();
        fileUploadElement.addEventListener('change', function(event) {
          $scope.datasourceUpload.loading();
          var files = event.target.files;
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
              callback(file,event);
          }
          $scope.datasourceUpload.loading();
        });
      });

      function _createInput() {
        fileUploadElement = document.createElement('input');
        fileUploadElement.setAttribute('type', 'file');
        fileUploadElement.setAttribute('accept', uploadType);
        return fileUploadElement;
      }
    }
  }

})();
