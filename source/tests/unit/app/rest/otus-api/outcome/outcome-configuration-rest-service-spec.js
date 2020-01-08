describe('Outcome Rest Service', function () {
    const ID = 'medicamentos';

    var Mock = {};
    var service;
    var Injections = {};


    beforeEach(function () {
        angular.mock.module('otusDomain.rest');
    });

    describe('serviceInstance', function () {

        beforeEach(function () {
            mockInjections();

            angular.mock.module('otusDomain.rest', function ($provide) {
                $provide.value('OtusRestResourceService', Mock.OtusRestResourceService);
            });
        });

        beforeEach(function () {

            inject(function (_$injector_) {
                Injections = {
                    OtusRestResourceService: Mock.OtusRestResourceService
                };
                service = _$injector_.get('OutcomeRestService');
                service.initialize();

            });
        });

        describe('initialize method', function () {
            beforeEach(function () {
                spyOn(service, 'initialize').and.callThrough();
                spyOn(Injections.OtusRestResourceService, 'getOutcomeResourceFactory').and.callThrough();
                service.initialize();
            });

            it('should initialize be defined', function () {
                expect(service.initialize).toHaveBeenCalled();
                expect(service.initialize).not.toBeNull();
                expect(Injections.OtusRestResourceService.getOutcomeResourceFactory).toHaveBeenCalled();
            });

        });

        describe('create method', function () {
            beforeEach(function () {
                service.initialize();
                spyOn(service, 'create').and.callThrough();
                // spyOn(service, 'create').and.returnValue(Promise.resolve(123));
                service.create(Mock.outcomeConfig);
            });

            it('should create be defined', function () {
                expect(service.create).toHaveBeenCalled();
                expect(service.create).not.toBeNull();
            });
        });

        describe('update method', function () {
            beforeEach(function () {
                spyOn(service, 'update').and.callThrough();
                service.update();
            });

            it('should update be defined', function () {
                expect(service.update).toHaveBeenCalled();
                expect(service.update).not.toBeNull();
            });
        });

        describe('list method', function () {
            beforeEach(function () {
                spyOn(service, 'list').and.callThrough();
                service.list();
            });

            it('should update be defined', function () {
                expect(service.list).toHaveBeenCalled();
                expect(service.list).not.toBeNull();
            });
        });


        function mockInjections() {
            Mock.outcomeConfig = {
                "id": "12345",
                "name": "DESFECHOS",
            };

            Mock.OtusRestResourceService = {
                getOutcomeResourceFactory: function() {
                    return {
                        create: function(data) {
                            return Promise.resolve({data: data});
                        },
                        update: (data) => {
                            return Promise.resolve({data: data});
                        },
                        list: () => {
                            return Promise.resolve({data: Mock.outcomeConfig});
                        }
                    };
                }
            };
        }
    });
});
