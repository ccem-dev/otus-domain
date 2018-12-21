(function() {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('datasourceManager', {
      controller: "datasourceManagerController as $ctrl",
      templateUrl: 'app/project/datasource/datasource-manager-template.html'
    });

}());
