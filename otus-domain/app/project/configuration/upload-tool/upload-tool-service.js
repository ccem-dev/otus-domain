(function() {
    'use strict';

    angular
        .module('otusDomain.project')
        .service('otusjs.otus-domain.project.UploadToolService', service);

    service.$inject = [];

    function service() {
        var self = this;

        /* Public Interface */
        self.uploadTypeResolver = uploadTypeResolver;

        function uploadTypeResolver(type) {
            var acceptance = '';
            if (type) {
                type = type.replace(/\s/g, "").split(',');
                for (var i = 0; i < type.length; i++) {
                    var mappedType = _typesMap(type[i]);
                    if (mappedType) {
                        acceptance += mappedType + ', ';
                    }
                }
            }            
            return acceptance || 'any';
        }

        function _typesMap(type) {
            var typeMap = {
                'image': 'image/*',
                'jpg': '.jpg',
                'png': '.png',
                'json': '.json'
            };
            return typeMap[type];
        }

    }

}());
