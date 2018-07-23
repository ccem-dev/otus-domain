(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusPainel', {
      controller: Controller,
      templateUrl: 'app/project/otus-painel/otus-painel-template.html',
      bindings: {
        headerLabel: '<',
        colorTop: '<',
        colorBottom: '<',
        align: '<'
      },
      transclude: true
    });

  function Controller() {
    var self = this;

    self.$onInit = onInit;

    function onInit() {
      self.title = self.title || '';
      self.align = self.align || 'center end';
      self.colorTop = self.colorTop || '#0092F8';
      self.colorBottom = self.colorBottom || '#215AAE';
    }
  }
}());