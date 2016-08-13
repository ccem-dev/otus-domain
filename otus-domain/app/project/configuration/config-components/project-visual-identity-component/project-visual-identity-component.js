(function() {
    'use strict'

    angular
        .module('otusDomain.project')
        .component('otusVisualIdentity', {
            templateUrl: 'app/project/configuration/config-components/project-visual-identity-component/project-visual-identity-template.html',

            controller: function($q, ProjectConfigurationService) {
                var self = this;
                _init();

                /* Public Interface*/
                self.logoURL = 'app/assets/img/image_not_found.jpg';
                self.bannerURL = 'app/assets/img/image_not_found.jpg';
                self.uploadBanner = {
                    'callback': updateBanner,
                    'type': 'image'
                };
                self.uploadLogo = {
                    'callback': updateLogo,
                    'type': 'image'
                };
                self.save = save;


                function _init() {
                    self.data = ProjectConfigurationService.fetchConfig();
                }

                function updateBanner(file) {
                    getImageURL(file).then(function(imageURL){
                      self.bannerURL = imageURL;
                  });
                }

                function updateLogo(file) {
                    getImageURL(file).then(function(imageURL) {
                      self.logoURL = imageURL;
                    });
                }

                function getImageURL(file) {
                    var deferred = $q.defer();
                    var reader = new FileReader();
                    reader.onload = function() {
                        deferred.resolve(reader.result);
                    };
                    reader.readAsDataURL(file);
                    return deferred.promise;

                }

                function save(){
                  console.log('save');
                }
            }
        });
}());
