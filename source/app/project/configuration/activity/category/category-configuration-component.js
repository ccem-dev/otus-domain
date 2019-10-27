(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activityCategoryConfiguration', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/category/category-configuration-template.html'
    });

  Controller.$inject = [
    '$mdToast',
    'ActivityConfigurationRestService'
  ];

  function Controller($mdToast, ActivityConfigurationRestService) {
    var self = this;
    self.newCategoryLabel = "";

    self.$onInit = onInit;
    self.newCategory = newCategory;
    self.listCategories = listCategories;

    function onInit() {
      listCategories();
    }

    function newCategory() {
      if (self.newCategoryLabel) {
        ActivityConfigurationRestService.save(self.newCategoryLabel).then(function (newCat) {
          self.newCategoryLabel = "";
          self.categories.push(newCat.data);
        });
      } else {
        _toastEmptyNewCategory();
      }
    }

    function listCategories() {
      ActivityConfigurationRestService.list().then(function (result) {
        self.categories = result;
      });
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
