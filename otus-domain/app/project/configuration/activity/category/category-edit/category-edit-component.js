(function() {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('categoryEdit', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/category/category-edit/category-edit-template.html',
      bindings:{
        categoryData: '<',
        reloadCategories: '&'
      }
    });

  Controller.$inject = [
    '$mdToast',
    '$mdDialog',
    'ActivityRestService'
  ];

  function Controller($mdToast, $mdDialog, ActivityRestService) {
    var self = this;
    var _confirmRemoval;

    self.onUpdate = false;

    self.$onInit = onInit;

    self.categoryUpdate = categoryUpdate;
    self.saveCategory = saveCategory;
    self.removeCategory = removeCategory;
    self.saveDefault = saveDefault;

    function onInit() {
      _buildDialogs();
    }

    function categoryUpdate() {
      self.onUpdate = true;
    }

    function saveCategory() {
      if(self.categoryData.label) {
        ActivityRestService.update(self.categoryData).then(function () {
          self.onUpdate = false;
          _confirmRemoval.textContent('A categoria '+self.categoryData.label+' sera removida');
        });
      } else {
        _toastEmptyNewCategory();
      }
    }

    function saveDefault() {
      if(!self.categoryData.isDefault)
      {
        ActivityRestService.setDefault(self.categoryData).then(function () {
          self.reloadCategories();
        });
      } else {
        self.categoryData.isDefault=1;
        _toastDefaultCategory();
      }
    }

    function removeCategory() {
      if(!self.categoryData.isDefault)
      {
        $mdDialog.show(_confirmRemoval).then(function() {
          ActivityRestService.remove(self.categoryData).then(function () {
            self.reloadCategories();
          });
        });

      } else {
        _toastDefaultCategory();
      }
    }

    function _toastDefaultCategory() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Uma nova categoria padrão deve ser definida')
          .hideDelay(2000)
      );
    }

    function _buildDialogs() {
      _confirmRemoval = $mdDialog.confirm()
        .title('Confirmar remoção:')
        .textContent('A categoria '+self.categoryData.label+' sera removida')
        .ariaLabel('Confirmação de remoção')
        .ok('Ok')
        .cancel('Voltar');
    }

    function _toastEmptyNewCategory() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('A label não pode ser vazia')
          .hideDelay(2000)
      );
    }
  }
}());
