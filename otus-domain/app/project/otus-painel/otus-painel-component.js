(function() {
  'use strict';

  angular
    .module('otusDomain.project')
    .component('otusPainel', {
      controller: Controller,
      templateUrl: 'app/project/otus-painel/otus-painel-template.html',
      bindings: {
        headerLabel: '<',
        colorLeft: '<',
        colorRight: '<',
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
      self.colorLeft = self.colorLeft || '#0092F8';
      self.colorRight = self.colorRight || '#7FC8FB';
    }
  }
}());