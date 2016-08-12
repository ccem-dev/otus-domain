(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .directive('uploadTool', directive);

    directive.$inject = [
        'otusjs.otus-domain.project.UploadToolService'
    ];

    function directive(UploadToolService) {

        var ddo = {
            restrict: 'A',
            link: linkFunction
        };
        return ddo;

        function linkFunction($scope, $element, attributes) {
            var fileUploadElement;
            var uploadType = attributes.type || 'any';
            $element.on('click', function(event) {
                fileUploadElement = _createInput(uploadType);
                fileUploadElement.click();

                fileUploadElement.addEventListener('change', function() {
                    var fileToUpload = this.files[0];
                    console.log(fileToUpload);
                });
            });

            function _uploadSurveyTemplate(fileToUpload) {
                var reader = new FileReader();
                reader.readAsDataURL(fileToUpload);
                reader.onload = function() {

                };
            }

            function _createInput(uploadType) {
                var acceptance = UploadToolService.uploadTypeResolver(uploadType);
                if (acceptance !== '') {
                    fileUploadElement = document.createElement('input');
                    fileUploadElement.setAttribute('type', 'file');
                    fileUploadElement.setAttribute('accept', acceptance);
                } else {
                    fileUploadElement = document.createElement('button');
                }

                return fileUploadElement;
            }

        }
    }

}());
