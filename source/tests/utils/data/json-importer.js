const Test = {};
Test.utils = {};
Test.utils.data = {}
Test.utils.data.activityReport = {
   "_id" : "123456789",
  "acronym" : "CSP",
  "versions" : [
    1
  ],
  "template" : "  \n<otus-script>\n</otus-script>\n<div>\n  <style type=\"text/css\">\n    img {\n      display: block;\n      margin-left: auto;\n      margin-right: auto;\n      margin-bottom: 0.5cm;\n      width: 80mm;\n    }\n\n    hr {\n      border-top: 1.5pt solid #000000;\n    }\n\n    .footer{\n      width: 100%;\n      border-top: 2.0pt solid #000000;\n      font-family: \"Arial\", \"serif\";\n      font-size: 12px;\n      text-align: center;\n      position: absolute; \n    }\n\n    .footer-1{ \n      top: 260mm; \n    }\n\n    .footer-2{ \n      top: 537.5mm; \n    }\n    \n    .footer-3{ \n      top: 814mm; \n    }\n\n    .participantInfo {\n      display: flex;\n      border-bottom: 2.0pt solid #000000;\n    }\n\n    .column {\n      flex: 20%;\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    .contextValues p:first-of-type {\n      font-size: 14px;\n    }\n\n    .contextObs {\n      font-family: \"Verdana\", \"serif\";\n      font-size: 12px;\n    }\n\n    .break {\n      page-break-before: always;\n    }\n    p{\n      margin: 0.5em 0;\n    }\n  </style>\n  <header>\n    <!-- TODO: Substituir imagem -->\n    <img src=\"http://wiki.inf.otus-solutions.com.br/images/d/d4/ELSA-logo.jpg\">\n  </header>\n\n  <section class=\"participantInfo\">\n    <section class=\"column\">\n      Nome: {{data.participant.name}}\n      <br> Sexo: {{data.sexo}}\n      <br> Data de Nascimento: {{data.nascimento}}\n      <br>\n    </section>\n    <section class=\"column\">\n      Número de Recrutamento: {{data.participant.recruitmentNumber}}\n      <br> Data da coleta: {{data.date}}\n    </section>\n  </section>\n\n  <section class=\"contextValues\">\n    <p>Relatório de Atividade</p>\n    <br/>\n    <p>Formulário: CENTRO DE LEITURA DE RETINOGRAFIA</p>\n  </section>\n\n  <section class=\"contextObs\">\n    <span ng-if=\"data.exameColesterolTotalFracoesObs\">\n      <p>Obs: {{data.exameColesterolTotalFracoesObs}}</p>\n      <br>\n    </span>\n    <p>Sigla : RETCLQ</p>\n    <p>Questão 1 : true</p>\n    </section>\n\n   <footer class=\"footer footer-1\">\n    <p>Responsável técnico: Ligia Maria Giongo Fedeli - CRF SP 10491 - Pagina 1</p>\n  </footer>\n\n",
  "label" : "CSP",
  "sender" : "otus@gmail.com",
  "sendingDate" : "2018-11-07T15:51:53.725Z",
  "dataSources" : [
    {
      "key" : "self",
      "dataSource" : "ActivityReportAnswerFilling",
      "label" : "Questões de DSN",
      "result" : [],
      "optional" : true
    },
    {
      "filters" : {
        "acronym" : "CSJ",
        "version" : 1,
        "category" : "C0"
      },
      "key" : "CSJ",
      "dataSource" : "AnswerFilling",
      "label" : "Questões de CSJ",
      "result" : [],
      "optional" : false
    }
  ]
}
Test.utils.data.stageJsons = [
    {
        "_id": "5f8755f9a56c24306f4df6d3",
        "objectType": "Stage",
        "name": "Onda 3",
        "surveyAcronyms": [
            "ISG",
            "FRC",
            "CURC"
        ]
    },
    {
        "_id": "5f9324d0f93300349b5c97f7",
        "objectType": "Stage",
        "name": "Onda 4",
        "surveyAcronyms": [
            "CURC",
            "ISG"
        ]
    },
    {
        "_id": "5faea243cb7fe05c180673c2",
        "objectType": "Stage",
        "name": "Covid",
        "surveyAcronyms": [
            "FRC",
            "CSP",
            "CURC"
        ]
    },
    {
        "_id": "5faea258cb7fe05c180673c3",
        "objectType": "Stage",
        "name": "Onda 2",
        "surveyAcronyms": [
            "ISG"
        ]
    }
]
