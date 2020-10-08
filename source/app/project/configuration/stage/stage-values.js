(function () {
    'use strict';

    angular.module('otusDomain.dashboard')
        .value('otusDomain.dashboard.StageValues', {
            titles: {
                main: "Etapas",
                secondary: "Configuração para etapas do projeto",
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
                deleteStage: {
                    title: "Exclusão de Etapa: ",
                    textContent: "Você realmente deseja EXCLUIR esta etapa?",
                    ariaLabel: "exclusão de etapa"
                },

                updateStage: {
                    title: "Atualização de Etapa: ",
                    textContent: "Você realmente deseja ATUALIZAR esta etapa?",
                    ariaLabel: "atualização de etapa"
                },

                buttons: {
                    confirm: "Sim",
                    cancel: "Não"
                }
            },

            toast : {
                successMessage:"Solicitação realizada com sucesso.",
                failureMessage: "Ocorreu algum problema, tente novamente mais tarde",
                deleteSuccessMessage: "Remoção realizada com sucesso",
                updateSuccessMessage: "Atualização realizada com sucesso"
            }
        });
}());
