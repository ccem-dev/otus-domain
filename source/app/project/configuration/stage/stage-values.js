(function () {
    'use strict';

    angular.module('otusDomain.dashboard')
        .value('otusDomain.dashboard.StageValues', {
            titles: {
                main: "Etapas",
                secondary: "Configuração para Identificação de Ondas",
                emptyList: "Não há etapas cadastradas.",
                listStages: "Registros",
                inputName: "Nome"
            },
            buttons: {
                add: {
                    icon: "plus",
                    text: "Adicionar Etapa"
                },
                save: {
                    icon: "save",
                    text: "Salvar"
                },
                cancel: {
                    icon:"arrow_back",
                    text:"Cancelar"
                },
                delete: {
                    icon: "delete",
                    text: "Deletar"
                }
            },
            icon: {
                stage: "stacked_line_chart"
            },

            errors: {
                required: "Campo obrigatório"

            }

        });
}());
