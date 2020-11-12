(function () {
    'use strict';

    angular
        .module('otusDomain.dashboard')
        .component('surveyTemplateConfiguration', {
            controller: "surveyTemplateConfigurationCtrl as $ctrl",
            templateUrl: 'app/project/configuration/activity/survey-template/survey-template-configuration-template.html',
            bindings: {
                surveyForm: '<',
                surveyTemplates: '=',
                mirrorEditModeStatus: '&',
                blocEdit: '<'
            }
        }).controller('surveyTemplateConfigurationCtrl', Controller);

    Controller.$inject = [
        '$q',
        'otusDomain.project.activity.SurveyGroupConfigurationService',
        'otusDomain.rest.configuration.ProjectConfigurationService',
        '$mdDialog',
        '$mdToast',
        'otusjs.model.activity.ActivityPermissionFactory',
        'DashboardStateService',
        'ActivityConfigurationManagerService',
        'otusDomain.dashboard.StageConfigurationService'
    ];

    function Controller($q, SurveyGroupConfigurationService, ProjectConfigurationService, $mdDialog, $mdToast,
                        ActivityPermissionFactory, DashboardStateService, ActivityConfigurationManagerService,
                        StageConfigurationService) {

        var ERROR_MESSAGE = 'Ocorreu algum problema, tente novamente mais tarde';
        var timeShowMsg = 5000;
        var _deleteConfirmDialog;
        var self = this;
        self.showSettings;
        self.usersList = [];
        self.groups = [];
        self.stages = [];

        /* Public methods */
        self.$onInit = onInit;
        self.showActivitySettings = showActivitySettings;
        self.deleteSurveyTemplate = deleteSurveyTemplate;
        self.querySearch = querySearch;
        self.queryStageSearch = queryStageSearch;
        self.onModelChange = onModelChange;
        self.surveyGroupsEdit = surveyGroupsEdit;
        self.stagesEdit = stagesEdit;
        self.updateSurveyGroups = updateSurveyGroups;
        self.updateStages = updateStages;

        function onInit() {
            self.surveyGroupsEditMode = false;
            self.stagesEditMode = false;
            self.permissionList = [];
            _dialogs();
            _fetchGroups();
            _getCollectionOfPermissions();
            _loadStages();
            self.permission = ActivityPermissionFactory.fromJsonObject({
                acronym: self.surveyForm.surveyTemplate.identity.acronym,
                version: self.surveyForm.version
            });
        }

        function _loadStages() {
            StageConfigurationService.loadStages()
                .then((res) => self.stages = res)
                .catch(() => self.stages = []);
        }

        function showActivitySettings() {
            _filterUsersWithPermissionExclusiveDisjunction();
            ActivityConfigurationManagerService.setSurveyInContext(self.surveyForm);
            ActivityConfigurationManagerService.setPermissionInContext(self.permission);
            DashboardStateService.goToActivitySettings();
        }

        function surveyGroupsEdit() {
            if (!self.blocEdit) {
                self.mirrorEditModeStatus({status: true});
                self.surveyGroupsEditMode = true;
            } else {
                $mdToast.show($mdToast.simple().textContent('Você já está em modo de edição em outra atividade').hideDelay(2000));
            }
        }

        function stagesEdit() {
            if (!self.blocEdit) {
                self.mirrorEditModeStatus({status: true});
                self.stagesEditMode = true;
            } else {
                $mdToast.show($mdToast.simple().textContent('Primeiro finalize a outra edição em aberto').hideDelay(2000));
            }
        }

        function updateSurveyGroups() {
            SurveyGroupConfigurationService.getListOfSurveyGroups()
                .then(function (data) {
                    var oldGroups = data.getSurveyGroups(self.surveyForm.surveyTemplate.identity.acronym);
                    var removedGroups = _getRemovedGroups(oldGroups);

                    removedGroups.forEach(function (groupName) {
                        var group = data.getGroup(groupName);
                        if (group) {
                            group.removeSurvey(self.surveyForm.surveyTemplate.identity.acronym);
                            SurveyGroupConfigurationService.updateSurveyGroupAcronyms(group.toJSON())
                        }
                    });

                    _addNewGroups(data, _getNewGroups(oldGroups)).then(function (notFoundGroups) {
                        if (notFoundGroups.length > 0) {
                            $mdToast.show($mdToast.simple().textContent('Grupo(s) (' + notFoundGroups + ') não encontado(s)').hideDelay(5000));
                        }
                        _fetchGroups();
                    });
                    self.mirrorEditModeStatus({status: false});
                    self.surveyGroupsEditMode = false;
                })
        }

        function updateStages() {
            alert('update stages');
            self.mirrorEditModeStatus({status: false});
            self.stagesEditMode = false;
        }

        function _getRemovedGroups(oldGroups) {
            return oldGroups.filter(function (groupName) {
                var foundGroup = self.surveyForm.groups.filter(function (newGroup) {
                    if (newGroup.getName() === groupName) {
                        return true
                    }
                });
                return foundGroup.length <= 0;
            });
        }

        function _addNewGroups(groupsManager, newGroups) {
            var defer = $q.defer();
            var notFoundGroups = [];

            newGroups.forEach(function (newGroup, index) {
                var group = groupsManager.getGroup(newGroup.getName());
                if (group) {
                    group.addSurvey(self.surveyForm.surveyTemplate.identity.acronym);
                    SurveyGroupConfigurationService.updateSurveyGroupAcronyms(group.toJSON()).then().catch(function () {
                        notFoundGroups.push(newGroup.getName());
                        if (index === newGroups.length - 1) {
                            defer.resolve(notFoundGroups);
                        }
                    });
                } else {
                    notFoundGroups.push(newGroup.getName());
                    if (index === newGroups.length - 1) {
                        defer.resolve(notFoundGroups);
                    }
                }


            });
            return defer.promise;
        }

        function _getNewGroups(oldGroups) {
            return self.surveyForm.groups.filter(function (newGroup) {
                var foundGroup = oldGroups.filter(function (groupName) {
                    if (newGroup.getName() === groupName) {
                        return true
                    }
                });
                return foundGroup.length <= 0;
            });
        }

        function deleteSurveyTemplate() {
            $mdDialog.show(_deleteConfirmDialog).then(function () {
                var index = self.surveyTemplates.indexOf(self.surveyForm);
                ProjectConfigurationService.deleteSurveyTemplate(self.surveyForm.surveyTemplate.identity.acronym)
                    .then(function () {
                        self.surveyTemplates.splice(index, 1);
                        $mdToast.show($mdToast.simple().textContent('Excluído').hideDelay(2000));
                    })
                    .catch(function () {
                        $mdToast.show($mdToast.simple().textContent('Erro ao excluir').hideDelay(2000));
                    });
            }, function () {
            });
        }

        function querySearch(criteria) {
            return criteria ? self.groupsManager.getGroupList().filter(_createFilterFor(criteria)) : [];
        }

        function queryStageSearch(criteria) {
            return criteria ? self.stages.filter(_createFilterFor(criteria)) : [];
        }


        function _createFilterFor(query) {
            var lowercaseQuery = query.toLowerCase();

            return function filterFn(group) {
                return (group.getName().toLowerCase().indexOf(lowercaseQuery) !== -1);
            };

        }

        function onModelChange(newModel) {
            $log.log('The model has changed to ' + JSON.stringify(newModel) + '.');
        }

        function _filterUsersWithPermissionExclusiveDisjunction() {
            self.permissionList.forEach(function (permission) {
                if (permission.acronym === self.surveyForm.surveyTemplate.identity.acronym && permission.version == self.surveyForm.version) {
                    self.permission = ActivityPermissionFactory.fromJsonObject(permission);
                }
            });
        }

        function _getCollectionOfPermissions() {
            ProjectConfigurationService.getCollectionOfPermissions()
                .then(function (data) {
                    self.permissionList = data;
                }).catch(function () {
                $mdToast.show($mdToast.simple().textContent(ERROR_MESSAGE).hideDelay(timeShowMsg));
            });
        }

        function _fetchGroups() {
            SurveyGroupConfigurationService.getListOfSurveyGroups()
                .then(function (data) {
                    var groupNames = data.getSurveyGroups(self.surveyForm.surveyTemplate.identity.acronym);
                    self.surveyForm.groups = [];
                    groupNames.forEach(function (groupName) {
                        self.surveyForm.groups.push(data.getGroup(groupName))
                    });
                    self.groupsManager = data;
                }).catch(function () {
                self.groups = [];
            });
        }

        function _dialogs() {
            _deleteConfirmDialog = $mdDialog.confirm()
                .title('Exclusão de Formulário')
                .textContent('Você tem certeza que deseja excluir esse Formulário?')
                .ariaLabel('exclusão de formulário')
                .ok('Sim')
                .cancel('Não');
        }
    }
}());
