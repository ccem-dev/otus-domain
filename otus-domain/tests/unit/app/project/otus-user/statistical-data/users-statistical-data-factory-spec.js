describe("Users Statistical Data Factory Tests", function() {
  var Mock = {};
  var factory;

  beforeEach(function() {
    angular.mock.module("otusDomain.project");
  });

  beforeEach(function() {
    mockData();
    inject(function(_$injector_)  {
      factory = _$injector_.get("usersStatisticalDataFactory");
    });

  });

  it('should defined methods', function () {
    expect(factory.create).toBeDefined();
  });

  it('should return object empty', function () {
    expect(factory.create().toJSON()).toEqual({});
  });

  it('should return structure', function () {
    expect(factory.create(Mock.users).toJSON()).toEqual(Mock.structure);
  });


  function mockData() {
    Mock.user1 = {
      enable:true,
      extraction:true,
      fieldCenter:{
        acronym: "RS"
      }
    };

    Mock.user2 = {
      enable:false,
      extraction:true,
      fieldCenter:{
        acronym: "SP"
      }
    };

    Mock.user3 = {
      enable:true,
      extraction:false,
      fieldCenter:{
        acronym: "SP"
      }
    };

    Mock.user4 = {
      enable:false,
      extraction:false,
      fieldCenter:{
        acronym: "RS"
      }
    };
    Mock.users = [Mock.user1, Mock.user2, Mock.user3, Mock.user4];

    Mock.structure = {
      total: 4,
      inactive: 2,
      usersOfExtraction: 2,
      centers:[
        {acronym:"RS", total:2},
        {acronym:"SP", total:2}
      ]
    }
  }
});