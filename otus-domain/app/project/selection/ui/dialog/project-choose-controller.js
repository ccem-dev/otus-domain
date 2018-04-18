(function () {
  'use strict';

  angular
    .module('otusDomain.project')
    .controller('ProjectChooseController', ProjectChooseController);

  ProjectChooseController.$inject = [
    '$scope',
    '$mdDialog',
    'projects',
    'ProjectSecurityService',
    '$mdToast',
    'ProjectContext',
    'OtusRestResourceService'
    ];

  function ProjectChooseController($scope, $mdDialog, projects, ProjectSecurityService, $mdToast, ProjectContext, OtusRestResourceService




  ) {
    var OFFLINE_MESSAGE = 'Projeto Offline. Verifique o estado do projeto.';
    var AUTHENTICATION_ERROR_MESSAGE = 'Erro ao realizar autenticação no projeto';

    var self = this;
    self.projects = projects;
    self.close = close;
    self.select = select;

    init();

    function init() {
      validateConnection(self.projects);
      rollbackProjectConnectionData();
    }

    function close() {
      $mdDialog.cancel();
    }

    function validateConnection(projects) {
      projects.forEach(function (project) {
        ProjectSecurityService.isOnline(project);
      });
    }

    function select(project) {
      if (project.status) {
        ProjectSecurityService.authenticate(project).then(function (response) {
          approveProjectAuthentication(response.data, project);
          close();

        }, function () {
          rollbackProjectConnectionData();
          showAuthenticationErrorMessage();
        });
      } else {
        showOfflineMessage();
      }
    }

    function rollbackProjectConnectionData() {
      if (ProjectContext.hasProject()) {
        var lastSelectedProject = ProjectContext.getCurrentProject();

        OtusRestResourceService.setUrl(lastSelectedProject.projectRestUrl);
        OtusRestResourceService.setSecurityToken(lastSelectedProject.sessionToken);
      }
    }

    function approveProjectAuthentication(token, project) {
      project.sessionToken = token;
      OtusRestResourceService.setSecurityToken(project.sessionToken);
      ProjectContext.setProject(project);
    }

    function showOfflineMessage() {
      $mdToast.show($mdToast.simple().textContent(OFFLINE_MESSAGE));
    }

    function showAuthenticationErrorMessage() {
      $mdToast.show($mdToast.simple().textContent(AUTHENTICATION_ERROR_MESSAGE));
    }
  }
})();
