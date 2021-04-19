(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('dynamicDialog', {
      controller: "dynamicDialogCtrl as $ctrl",
      templateUrl: 'app/project/components/dynamic-dialog/dynamic-dialog-template.html',
      bindings: {
        data: "=",
        callbackFunctions: "=",
        template: "=",
        buttonClass: "=",
        buttonIcon: "=",
        buttonText: "="
      }
    });
}());