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
    'ActivityRestService'
  ];

  function Controller($mdToast, ActivityRestService) {
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
        ActivityRestService.save(self.newCategoryLabel).then(function (newCat) {
          self.newCategoryLabel = "";
          self.categories.push(newCat.data);
        });
      } else {
        _toastEmptyNewCategory();
      }
    }

    function listCategories() {
      ActivityRestService.list().then(function (result) {
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
