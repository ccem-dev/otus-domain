describe('surveyGroupConfiguration', function () {
  const FILE = 'fake1;extraction';
  var controller;
  var Mock = [];

  describe('componentInstance', function () {
    beforeEach(function () {
      mockInjections();
      angular.mock.module('otusDomain.rest', function ($provide) {
        $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
      });
      angular.mock.module('otusDomain.dashboard', function ($provide) {
        $provide.value('otusDomain.project.activity.SurveyGroupConfigurationService', Mock.SurveyGroupConfigurationService);
        $provide.value('$mdToast', Mock.mdToast);
        $provide.value('$mdDialog', Mock.mdDialog);
      });
    });

    beforeEach(function () {
      inject(function (_$controller_, _$injector_) {
        controller = _$controller_('surveyGroupConfigurationController');
        controller.$onInit();
      });
      spyOn(Mock.mdDialog, "confirm").and.callThrough();
      spyOn(Mock.mdToast, "show").and.callThrough();
    });

    it('controllerExistence check', function () {
      expect(controller).toBeDefined();
    });

    describe('onInit method', function () {

      beforeEach(function () {
        spyOn(Mock.SurveyGroupConfigurationService, 'getListOfSurveyGroups').and.callThrough();
      });

      it('should to be defined', function () {
        expect(controller.$onInit).toBeDefined();
      });

      it('should call getListOfSurveyGroups method', function () {
        controller.$onInit();

        expect(Mock.SurveyGroupConfigurationService.getListOfSurveyGroups).toHaveBeenCalledTimes(1);
      });

    });

    describe('_getListOfSurveyGroups method', function () {

      it('should define list of groups', function () {
        spyOn(Mock.SurveyGroupConfigurationService, 'getListOfSurveyGroups').and.returnValue(Promise.resolve(Mock.groups));

        Mock.SurveyGroupConfigurationService.getListOfSurveyGroups().then(function () {
          expect(controller.groups).toBeTruthy();
        });
      });

      it('should define of error message when groups is empty', function () {
        spyOn(Mock.SurveyGroupConfigurationService, 'getListOfSurveyGroups').and.returnValue(Promise.resolve(Mock.listGroup));

        Mock.SurveyGroupConfigurationService.getListOfSurveyGroups().then(function () {
          expect(controller.error).toBeTruthy();
          expect(controller.error).toEqual('Atualmente não existem grupos cadastrados, para criar um grupo você deve definir um nome e clicar em adicionar.');
        });
      });

      xit('when promise is reject should define generic error message', function (done) {
        spyOn(Mock.SurveyGroupConfigurationService, "getListOfSurveyGroups").and.returnValue(Promise.reject());

        Mock.SurveyGroupConfigurationService.getListOfSurveyGroups().then(function () {
          expect(controller.error).toBeTruthy();
          expect(controller.error).toEqual('Erro de comunicação com servidor, tente novamente mais tarder.');
        });

        Mock.SurveyGroupConfigurationService.getListOfSurveyGroups().then(function () {
          done();
        }).catch(function () {
          done();
        })
      });

    });

    describe('addNewSurveyGroup method', function () {

      beforeEach(function () {
        spyOn(Mock.SurveyGroupConfigurationService, 'addNewSurveyGroup').and.returnValue(Promise.resolve(Mock.groups));
        spyOn(Mock.SurveyGroupConfigurationService, 'getListOfSurveyGroups').and.callThrough();
      });

      it('when input is empty then addNewSurveyGroup method not be called', function () {
        controller.addNewSurveyGroup();

        expect(Mock.SurveyGroupConfigurationService.addNewSurveyGroup).not.toHaveBeenCalledTimes(1);
      });

      it('when input is defined should call addNewSurveyGroup method', function () {
        controller.newGroup = 'TEST';
        controller.addNewSurveyGroup();

        expect(Mock.SurveyGroupConfigurationService.addNewSurveyGroup).toHaveBeenCalledTimes(1);
      });

      it('when input is defined should call getListOfSurveyGroups method', function () {
        controller.newGroup = 'TEST';
        controller.addNewSurveyGroup();

        Mock.SurveyGroupConfigurationService.addNewSurveyGroup().then(function () {
          expect(Mock.SurveyGroupConfigurationService.getListOfSurveyGroups).toHaveBeenCalledTimes(1);
        });
      });

    });

    describe('updateSurveyGroupName method', function () {

      beforeEach(function () {
        spyOn(Mock.SurveyGroupConfigurationService, 'updateSurveyGroupName').and.callThrough();
      });

      it('should call updateSurveyGroupName method', function () {
        controller.updateSurveyGroupName(Mock.group1);

        expect(Mock.SurveyGroupConfigurationService.updateSurveyGroupName).toHaveBeenCalledTimes(1);
      });

    });

    describe('deleteSurveyGroup method', function () {
      beforeEach(function () {
        spyOn(Mock.SurveyGroupConfigurationService, 'deleteSurveyGroup').and.callThrough();
        spyOn(Mock.mdDialog, "show").and.returnValue(Promise.resolve());
      });

      it('should defined default error mensagem', function () {
        controller.deleteSurveyGroup(Mock.group1);

        expect(controller.message).toEqual('Você tem certeza que deseja excluir esse grupo?');
      });

      it('when groups contains acronyms then error message is specific', function () {
        controller.deleteSurveyGroup(Mock.group2);

        expect(controller.message).toEqual('Existem atividades relacionadas ao grupo, você tem certeza que deseja excluir esse grupo?');
      });

      it('should call mdDialog', function () {
        controller.deleteSurveyGroup(Mock.group2);

        expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
      });

      it('should call mdDialog', function () {
        controller.deleteSurveyGroup(Mock.group2);

        expect(Mock.mdDialog.show).toHaveBeenCalledTimes(1);
      });

      xit('should call deleteSurveyGroup method', function () {
        controller.deleteSurveyGroup(Mock.group2);

        expect(Mock.SurveyGroupConfigurationService.deleteSurveyGroup).toHaveBeenCalledTimes(1);
      });

    });

  });

  function mockInjections() {

    Mock.groups = {
      getGroupList: function () {
        return [];
      }
    }

    Mock.group1 = {
      getName: function () {
        return 'TEST';
      },

      getSurveys: function () {
        return []
      }
    }

    Mock.group2 = {
      getName: function () {
        return 'TEST';
      },

      getSurveys: function () {
        return ['ABC', 'DEF']
      }
    }

    Mock.mdToast = {
      show: function () { },
      simple: function () {
        var self = this;
        self.title = function () {
          return self;
        };
        self.textContent = function () {
          return self;
        };
        self.position = function () {
          return self;
        };
        self.hideDelay = function () {
          return self;
        };
        return self;
      }
    };


    Mock.mdDialog = {
      show: function () { },
      confirm: function () {
        var self = this;
        self.title = function () {
          return self;
        };
        self.textContent = function () {
          return self;
        };
        self.ariaLabel = function () {
          return self;
        };
        self.ok = function () {
          return self;
        };
        self.cancel = function () {
          return self;
        };
        return self;
      }
    };

    Mock.SurveyGroupConfigurationService = {
      getListOfSurveyGroups: function () {
        return Promise.resolve(Mock.groups)
      },
      addNewSurveyGroup: function () {
        return Promise.resolve(true)
      },
      updateSurveyGroupName: function () {
        return Promise.resolve()
      },
      updateSurveyGroupAcronyms: function () {
        return Promise.resolve()
      },
      deleteSurveyGroup: function () {
        return Promise.resolve()
      }
    };

    Mock.OtusRestResourceService = {
      getListOfSurveyGroups: function () {
        return {}
      },
      addNewSurveyGroup: function () {
        return {}
      },
      updateSurveyGroupName: function () {
        return {}
      },
      updateSurveyGroupAcronyms: function () {
        return {}
      },
      deleteSurveyGroup: function () {
        return {}
      }
    };
  }
});