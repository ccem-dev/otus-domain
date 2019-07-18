(function () {
  'use strict';

  angular
    .module('otusDomain.dashboard')
    .service('otusDomain.dashboard.business.SurveyTemplateTranslateService', Service);

  Service.$inject = [
    '$i18next'
  ];

  function Service($i18next) {
    var self = this;
    /* Public methods */
    self.translate = translate;

    function translate(dictionary) {
      dictionary.forEach(function (surveyItem) {
        _translateExtractionValues(surveyItem);
        _translateValidationTypes(surveyItem);
        _translateQuestionType(surveyItem);
      });
      return dictionary;
    }

    function _translateExtractionValues(surveyItem) {
      if (surveyItem.extractionValues) {
        if (_isSpecificExtraction(surveyItem.objectType)) {
          surveyItem.extractionValues = surveyItem.extractionValues.map(function (extractionValue) {
            switch (surveyItem.objectType) {
              case 'SingleSelectionQuestion':
                return extractionValue = $i18next.t('extractionValues.SingleSelectionQuestion', { extractionValue });
              case 'CheckboxQuestion':
                extractionValue.label = $i18next.t('booleanValue.' + extractionValue.label);
                return extractionValue = $i18next.t('extractionValues.CheckboxQuestion', { extractionValue });
            }
          });
        } else {
          switch (surveyItem.objectType) {
            case 'AutocompleteQuestion':
              return surveyItem.extractionValues = $i18next.t('extractionValues.AutocompleteQuestion');
            case 'FileUploadQuestion':
              return surveyItem.extractionValues = $i18next.t('extractionValues.FileUploadQuestion');
            default:
              return surveyItem.extractionValues = $i18next.t('extractionValues.Default');
          }
        }
      }
    }

    function _translateValidationTypes(surveyItem) {
      if (surveyItem.validationTypes) {
        surveyItem.validationTypes = surveyItem.validationTypes.map(function (validation) {
          if (validation.name === "mandatory" || validation.name === "accept" || validation.name === "alphanumeric" ||
            validation.name === "futureDate" || validation.name === "pastDate") {
            validation.value = $i18next.t('booleanValue.' + validation.value);
          }
          return validation = $i18next.t('validationTypes.' + validation.name, { validation });
        });
      }
    }

    function _translateQuestionType(surveyItem) {
      surveyItem.objectType = $i18next.t('questionDataType.' + surveyItem.objectType);
    }

    function _isSpecificExtraction(questionDataType) {
      return questionDataType === 'SingleSelectionQuestion' || questionDataType === 'CheckboxQuestion';
    }

  }
}());
