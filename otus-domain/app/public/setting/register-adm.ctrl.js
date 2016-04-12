angular.module('RegisterModule', ['ngMaterial', 'ui.mask', 'ngMessages', 'passwordControl'])
    .controller('SystemConfigCtrl', function($q, $scope, $http, $window, $mdDialog) {
        $scope.systemConf = {};
        $scope.systemConf.user = {};
        $scope.systemConf.emailSender = {};

        var HOSTNAME_NAV = 'http://' + window.location.hostname + ':' + window.location.port;
        var HOSTNAME_REST = 'http://' + window.location.hostname;

        var REST_CONFIG = HOSTNAME_REST + "/otus-domain-rest/session/rest/system/config";
        var REST_EMAIL_SERVICE = HOSTNAME_REST + "/otus-domain-rest/session/rest/system/validation/emailService";

        var HOME_PAGE = HOSTNAME_NAV + "/otus-domain/app/public/login.html";

        function confirmAlertToNavigate() {
            alert = $mdDialog.alert()
                .title('Informação')
                .content('Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.')
                .ok('ok');

            $mdDialog
                .show(alert)
                .finally(function() {
                    $window.location.href = HOME_PAGE;
                });
        }

        $scope.register = function(systemConf) {
            $scope.isLoading = true;
            $scope.validateEmailService(systemConf).then(function() {
                $http.post(REST_CONFIG, systemConf).then(function(response) {
                        $scope.isLoading = false;
                        confirmAlertToNavigate();
                    },
                    function() {
                        $scope.isLoading = false;
                    });
            }, function() {
                $scope.isLoading = false;
            });
        };

        $scope.validateEmailService = function(systemConf) {
            var deferred = $q.defer();

            if (systemConf.emailSender.email && systemConf.emailSender.password && systemConf.emailSender.passwordConfirm) {

                $http.post(REST_EMAIL_SERVICE, systemConf).then(function(response) {
                    if (response.data.data) {
                        $scope.resetValidationEmail();
                        deferred.resolve(true);

                    } else {
                        $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', false);
                        $scope.initialConfigSystemForm.$setValidity('emailService', false);
                        deferred.reject(false);
                    }
                });

                return deferred.promise;
            }
        };

        $scope.resetValidationEmail = function() {
            $scope.initialConfigSystemForm.emailSenderEmail.$setValidity('emailService', true);
            $scope.initialConfigSystemForm.$setValidity('emailService', true);
        };

    }).config(['$mdThemingProvider',
        function($mdThemingProvider) {

            $mdThemingProvider.theme('layoutTheme')
                .primaryPalette('blue', {
                    'default': 'A200',
                    'hue-1': '200'
                }).accentPalette('blue-grey', {
                    'default': '900'
                }).warnPalette('red');


            $mdThemingProvider.theme('layoutTheme');
        }
    ]);
