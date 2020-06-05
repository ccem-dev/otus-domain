(function () {

  angular
    .module('otusDomain.project')
    .constant('PERMISSION_LIST', {
      "SURVEY_GROUP" : "SurveyGroupPermission",
      "LABORATORY" : "LaboratoryPermission",
      "MONITORING" : "MonitoringPermission",
      "PARTICIPANT" : "ParticipantPermission",
      "ACTIVITY" : "ActivityPermission"
    });
}());
