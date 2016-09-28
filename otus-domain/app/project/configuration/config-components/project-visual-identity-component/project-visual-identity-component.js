(function() {
    'use strict';

    angular
        .module('otusDomain.project.configuration')
        .component('otusVisualIdentity', {
            templateUrl: 'app/project/configuration/config-components/project-visual-identity-component/project-visual-identity-template.html',
            controller: Controller


        });

    Controller.$inject = [
        '$q',
        'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
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

        var notFound = 'app/assets/img/image_not_found.jpg';


        function _init() {
            updateFields();
        }

        function fetchData() {
            var deferred = $q.defer();
            deferred.resolve(ProjectConfigurationService.fetchProjectsVisualIdentity());
            return deferred.promise;
        }

        function updateFields() {
            fetchData()
                .then(function(data) {
                    if (data.files) {
                        self.data = data;
                    } else {
                        self.data = {
                            'files': {
                                "logoURL": notFound,
                                "bannerURL": notFound
                            },
                            'date': ''
                        };
                    }
                })
                .finally(function() {
                    self.changed = false;
                });
        }

        function updateBanner(file) {
          //TODO testar tipo de arquivo
            self.progressBanner = true;
            getImageURL(file).then(function(imageURL) {
                self.data.files.bannerURL = imageURL;
                self.changed = true;
                self.progressBanner = false;
            });
        }

        function updateLogo(file) {
          //TODO testar tipo de arquivo
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
            ProjectConfigurationService.updateVisualIdentityConfiguration(uploadSet, successfull, failure);
        }

        function successfull() {
            self.data.sendingDate = getDate(new Date());
            $mdToast.show($mdToast.simple().textContent('Salvo com sucesso'));
        }

        function failure() {
          $mdToast.show($mdToast.simple().textContent('Falha ao atualizar imagem'));
          updateFields();
        }

        function getDate(date) {
            return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString();
        }

    }




}());
