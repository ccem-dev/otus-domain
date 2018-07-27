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

    var keys = {
      37: 1,
      38: 1,
      39: 1,
      40: 1
    };

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }
    self.disableScroll = disableScroll;
    self.enableScroll = enableScroll;
    function disableScroll() {
      console.log('disabled');
      if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove = preventDefault; // mobile
      document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
      console.log('enabled');
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}


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
