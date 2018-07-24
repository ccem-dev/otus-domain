(function() {
  'use strict';

  angular
    .module('otusDomain.project.fieldCenter')
    .controller('FieldCenterController', FieldCenterController);

  FieldCenterController.$inject = ['ProjectFieldCenterService', '$mdDialog', '$mdToast'];

  function FieldCenterController(ProjectFieldCenterService, $mdDialog, $mdToast) {
    var SUCCESS_MESSAGE = 'Centro atualizado';
    var self = this;
    self.centerAddAling = 'center center';
    self.centerAddheaderLabel = 'Novo Centro';

    self.getAllCenters = getAllCenters;
    self.edit = edit;
    self.update = update;
    self.showCreationTab = showCreationTab;
    self.$onInit = onInit;


    function onInit() {
      self.showAddCenterTab = false;
    }

    function getAllCenters() {
      return ProjectFieldCenterService.getCenters();
    }

    function edit(fieldCenter) {
      fieldCenter.editMode = !fieldCenter.editMode;
    }

    function showCreationTab(show) {
      self.showAddCenterTab = show;
    }

    function update(fieldCenter) {
      ProjectFieldCenterService.update(fieldCenter, function(response) {
        if (!response.hasErrors) {
          $mdToast.show(
            $mdToast.simple().textContent(SUCCESS_MESSAGE)
          );
        }
      });
    }
  }

}());
