(function() {
    'use strict'

    angular
        .module('otusDomain.project')
        .component('otusVisualIdentity', {
            templateUrl: 'app/project/configuration/config-components/project-visual-identity-component/project-visual-identity-template.html',
            controller: Controller


        });

    Controller.$inject = [
        '$q',
        'otusjs.otus-domain.project.ProjectConfigurationService',
        '$mdToast'
    ];

    function Controller($q, ProjectConfigurationService, $mdToast) {
        var self = this;
        _init();

        /* Public Interface*/
        self.logoURL = 'app/assets/img/image_not_found.jpg';
        self.bannerURL = 'app/assets/img/image_not_found.jpg';
        self.progressBanner = false;
        self.progressLogo = false;
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
            self.data = ProjectConfigurationService.fetchProjectsVisualIdentity();
            self.changedd = false;
        }

        function updateBanner(file) {
            self.progressBanner = true;
            getImageURL(file).then(function(imageURL) {
                self.bannerURL = imageURL;
                self.changed = true;
                self.progressBanner = false;
            });
        }

        function updateLogo(file) {
            self.progressLogo = true;
            getImageURL(file).then(function(imageURL) {
                self.logoURL = imageURL;
                self.changed = true;
                self.progressLogo = false;
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

        function save() {
            self.changed = false;
            ProjectConfigurationService.updateVisualIdentityConfiguration({'logo':self.logoURL, 'banner':self.bannerURL});
            $mdToast.show($mdToast.simple().textContent('Salvo com sucesso'));
        }

    }




}());
