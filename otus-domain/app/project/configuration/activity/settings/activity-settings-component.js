(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .component('activitySettings', {
      controller: Controller,
      templateUrl: 'app/project/configuration/activity/settings/activity-settings-template.html',
      bindings:{
        permission: '<'
      }
    });

  Controller.$inject = [
    'otusjs.otus-domain.project.configuration.ProjectConfigurationService',
    '$mdToast'
  ];

  function Controller(ProjectConfigurationService, $mdToast) {
    const ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
    var timeShowMsg = 5000;
    var self = this;
    self.surveyTemplatesList = [];
    self.usersList = [];

    /* Public methods */
    self.$onInit = onInit;
    self.onModelChange = onModelChange;
    self.querySearch = querySearch;

    self.allContacts = loadContacts();

    function onInit() {
      self.contacts = [self.allContacts[0]]
      console.log(self.acronym)

    }


    function onModelChange(user) {
      // self.permission.
      // ProjectConfigurationService.setUsersExclusiveDisjunction(permission.toJSON())
      //   .then(function () {
      //     // TODO:
      //     $mdToast.show($mdToast.simple().textContent('Usuário(s) atualizado(s) com sucesso').hideDelay(timeShowMsg));
      //   })
      //   .catch(function () {
      //     $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
      //   });
    }

    function querySearch (criteria) {
      // var list = _ignoreAlreadySelectedUsers();
      return criteria ? self.allContacts.filter(createFilterFor(criteria)) : [];
    }

    function createFilterFor(query) {
      var lowercaseQuery = query.toLowerCase();

      return function filterFn(contact) {
        return (contact.name.indexOf(lowercaseQuery) !== -1);
      };

    }


    function loadContacts() {
      var contacts = [
        'Marina Augustine',
        'Oddr Sarno',
        'Nick Giannopoulos',
        'Narayana Garner',
        'Anita Gros',
        'Megan Smith',
        'Tsvetko Metzger',
        'Hector Simek',
        'Some-guy withalongalastaname'
      ];

      return contacts.map(function (c, index) {
        var cParts = c.split(' ');
        var email = cParts[0][0].toLowerCase() + '.' + cParts[1].toLowerCase() + '@example.com';

        var contact = {
          name: c,
          email: email
        };
        contact._lowername = contact.name.toLowerCase();
        return contact;
      });
    }


  }
}());