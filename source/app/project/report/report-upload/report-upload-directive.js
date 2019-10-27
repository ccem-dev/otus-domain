(function() {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .directive('reportTemplateUpload', reportTemplateUpload);

  function reportTemplateUpload() {
    var ddo = {
      restrict: 'A',
      link: linkFunction,
      scope: {
        reportTemplateUpload: '='
      }
    };
    return ddo;

    function linkFunction($scope, $element, $attrs) {
      var fileUploadElement;
      var uploadConfig = $scope.reportTemplateUpload;
      var callback = uploadConfig.callback || {};
      var uploadType = uploadConfig.type || 'any';

      $element.on('click', function() {
        fileUploadElement = _createInput();
        fileUploadElement.click();
        fileUploadElement.addEventListener('change', function(event) {
          var files = event.target.files;
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.type.match('html')) continue;
            var picReader = new FileReader();
            picReader.addEventListener("load", function(event) {
              var textFile = event.target;

              callback(textFile.result);
            });
            picReader.readAsText(file);
          }
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
