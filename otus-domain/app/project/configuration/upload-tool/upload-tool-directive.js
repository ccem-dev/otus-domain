(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .directive('uploadTool', directive);

    function directive() {

        var ddo = {
            restrict: 'A',
            link: linkFunction
        };
        return ddo;

        function linkFunction($scope, $element, attributes) {
            var fileUploadElement;
            var uploadType = attributes.uploadTool;
            $element.on('click', function() {
                fileUploadElement = _createInput(uploadType);
                fileUploadElement.click();

                fileUploadElement.addEventListener('change', function() {
                    var fileToUpload = this.files[0];
                    _uploadSurveyTemplate(fileToUpload);
                });
            });

            function _uploadSurveyTemplate(fileToUpload) {
              console.log(fileToUpload);
              var reader = new FileReader();
              reader.readAsDataURL(fileToUpload);
              console.log(reader);
              reader.onload = function() {
                console.log('load');
              };

              reader.onloadend = function() {
                // console.log(reader.result);
                console.log('loadend');
              };
                // SurveyTemplateUploadService.upload(fileToUpload);
            }

            function _createInput(uploadType) {
                fileUploadElement = document.createElement('input');
                fileUploadElement.setAttribute('type', 'file');
                fileUploadElement.setAttribute('accept', 'image/*');
                return fileUploadElement;
            }
        }
    }

}());
