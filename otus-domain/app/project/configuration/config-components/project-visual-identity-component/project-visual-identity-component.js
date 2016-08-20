(function() {
    'use strict';

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
        self.notFound = 'app/assets/img/image_not_found.jpg';

        function _init() {
            updateFields();
        }

        function updateFields() {
            var notFound = 'app/assets/img/image_not_found.jpg';
            (function() {
                var deferred = $q.defer();
                deferred.resolve(ProjectConfigurationService.fetchProjectsVisualIdentity());
                return deferred.promise;

            }())
            .then(function(data) {
                    self.data = data;
                })
                .finally(function() {
                    self.data.files.bannerURL = self.data.files.bannerURL || notFound;
                    self.data.files.logoURL = self.data.files.logoURL || notFound;
                    self.changed = false;
                });
        }

        function updateBanner(file) {
            self.progressBanner = true;
            getImageURL(file).then(function(imageURL) {
                self.data.files.bannerURL = imageURL;
                self.changed = true;
                self.progressBanner = false;
            });
        }

        function updateLogo(file) {
            self.progressLogo = true;
            getImageURL(file).then(function(imageURL) {
                self.data.files.logoURL = imageURL;
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
            var uploadSet = {
                'files': {
                    'logo': self.data.files.logoURL,
                    'banner': self.data.files.bannerURL
                },
                'sendingDate': new Date()
            };
            ProjectConfigurationService.updateVisualIdentityConfiguration(uploadSet);
            self.data.sendingDate = getDate(uploadSet.sendingDate);
            $mdToast.show($mdToast.simple().textContent('Salvo com sucesso'));
        }

        function getDate(date) {
            return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
        }

    }




}());
