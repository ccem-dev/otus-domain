(function () {

    angular
        .module('otusDomain')
        .config(['$mdThemingProvider', '$mdIconProvider', themeConfiguration]);

    function themeConfiguration($mdThemingProvider, $mdIconProvider) {

        $mdThemingProvider.theme('layoutTheme')
            .primaryPalette('blue', {
                'default': 'A200',
                'hue-1': '200'
            }).accentPalette('blue-grey', {
                'default': '900',
                'hue-1': '50'
            }).warnPalette('red');


        /*Configuration icons*/
        /* 24 is the size default of icons */
        $mdIconProvider.defaultIconSet('app/assets/img/icons/mdi.svg', 24);
    }

}());
