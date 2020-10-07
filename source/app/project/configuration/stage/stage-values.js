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
                    icon: "arrow_back",
                    text: "Cancelar"
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
            },

            confirmation: {
                stageDelete: {
                    title: "Exclusão de Etapa: ",
                    textContent: "Você tem realmente certeza que deseja excluir esta etapa?",
                    ariaLabel: "exclusão de etapa"
                },
                buttons: {
                    confirm: "Sim",
                    cancel: "Não"
                }
            },

            toast : {
                successMessage:"Solicitação realizada com sucesso.",
                failureMessage: "Ocorreu algum problema, tente novamente mais tarde",
                deleteSucess: "Remoção realizada com sucesso",
                updateSuccess: "Atualização realizada com sucesso"
            }
        });
}());
