describe("Users Statistical Data Component Tests", function() {
  var Mock = {};
  var Injections = {};
  var controller;
  var STYLE_MOCK = {
    "border-left": "1px inset rgba(215, 215, 215, 1)"
  };

  beforeEach(function() {
    angular.mock.module("otusDomain.project");
  });

  beforeEach(function() {
    inject(function(_$injector_, _$controller_) {
      Injections.usersStatisticalDataFactory = _$injector_.get("usersStatisticalDataFactory");
      controller = _$controller_("usersStatisticalDataCtrl", Injections);

    });

    spyOn(Injections.usersStatisticalDataFactory, "create").and.returnValue({toJSON: () => {}});
    controller.users = [{}]
  });

  it('controller defined', function() {
    expect(controller).toBeDefined();
    expect(controller.$onInit).toBeDefined();
    expect(controller.getStyle).toBeDefined();
    expect(controller.ready).toBeFalsy();
  });

  it('should ready true', function () {
    controller.$onInit();
    expect(Injections.usersStatisticalDataFactory.create).toHaveBeenCalledTimes(1);
    expect(controller.ready).toBeTruthy();
  });

  it('should return style', function () {
    expect(controller.getStyle()).toEqual(STYLE_MOCK);
  });

})
