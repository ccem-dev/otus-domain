describe("Users Statistical Data Component Tests", function() {
  var Mock = {};
  var Injections = {};
  var controller;
  var STYLE_MOCK = {
    "border-left": "1px inset rgba(215, 215, 215, 1)"
  };

  beforeEach(function() {
    mockInjections()
    angular.mock.module("otusDomain.project", function ($provide) {
      $provide.value("$mdDialog", Mock.$mdDialog)
    });
  });

  beforeEach(function() {
    inject(function(_$injector_, _$controller_) {
      Injections.usersStatisticalDataFactory = _$injector_.get("usersStatisticalDataFactory");
      Injections.$mdDialog = _$injector_.get("$mdDialog");
      controller = _$controller_("usersStatisticalDataCtrl", Injections);

    });

    spyOn(Injections.usersStatisticalDataFactory, "create").and.returnValue({toJSON: () => {}});
    controller.users = [{}]
  });

  it('controller defined', function() {
    expect(controller).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.show).toBeDefined();
    expect(controller.ready).toBeFalsy();
  });

  it('should ready true', function () {
    controller.$onInit();
    expect(Injections.usersStatisticalDataFactory.create).toHaveBeenCalledTimes(1);
    expect(controller.ready).toBeTruthy();
    controller.show()
  });

  function mockInjections() {
    Mock.$mdDialog = {
      show : function(){}
    }
  }

});

