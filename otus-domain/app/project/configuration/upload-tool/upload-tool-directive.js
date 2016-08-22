(function() {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .directive('uploadTool', directive);

    directive.$inject = [
        'otusjs.otus-domain.project.configuration.UploadToolService'
    ];

    function directive(UploadToolService) {

        var ddo = {
            restrict: 'A',
            link: linkFunction,
            scope: {
                uploadTool: '='
            }
        };
        return ddo;

        function linkFunction($scope, $element, attributes) {
            var fileUploadElement;
            var uploadConfig = $scope.uploadTool;
            var callback = uploadConfig.callback || {};
            var uploadType = uploadConfig.type || 'any';

            $element.on('click', function(event) {
                fileUploadElement = _createInput(uploadType);
                fileUploadElement.click();

                fileUploadElement.addEventListener('change', function() {
                    var fileToUpload = this.files[0];
                    if (fileToUpload) {
                        callback(fileToUpload);
                    }
                });
            });

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
