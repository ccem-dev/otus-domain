(function() {
  'use strict'


  angular
    .module('otusDomain.project')
    .component('otusVisualIdentity', {
      templateUrl:'app/project/configuration/config-components/project-visual-identity-component/project-visual-identity-template.html',

      controller: function() {
        var self = this;
        _init();

        /* Public Interface*/
        self.logoURL='app/assets/img/image_not_found.jpg';
        self.bannerURL='app/assets/img/image_not_found.jpg';

        function _init() {
        }

      }
    })
}());
