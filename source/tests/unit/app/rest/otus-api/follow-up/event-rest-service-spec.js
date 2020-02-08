describe('Event Rest Service', function () {
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
                service = _$injector_.get('EventRestService');
                service.initialize();

            });
        });

        describe('initialize method', function () {
            beforeEach(function () {
                spyOn(service, 'initialize').and.callThrough();
                spyOn(Injections.OtusRestResourceService, 'getEventResourceFactory').and.callThrough();
                service.initialize();
            });

            it('should initialize be defined', function () {
                expect(service.initialize).toHaveBeenCalled();
                expect(service.initialize).not.toBeNull();
                expect(Injections.OtusRestResourceService.getEventResourceFactory).toHaveBeenCalled();
            });

        });

        describe('create method', function () {
            beforeEach(function () {
                spyOn(service, 'create').and.callThrough();
                service.create();

            });

            it('should create be defined', function () {
                expect(service.create).toHaveBeenCalled();
                expect(service.create).not.toBeNull();
            });
        });

        describe('deactivate method', function () {
            beforeEach(function () {
                spyOn(service, 'deactivate').and.callThrough();
                service.deactivate();
            });

            it('should deactivate be defined', function () {
                expect(service.deactivate).toHaveBeenCalled();
                expect(service.deactivate).not.toBeNull();
            });
        });


        function mockInjections() {
            Mock.outcomeConfig = {
                "id": "12345",
                "name": "DESFECHOS",
            };

            Mock.OtusRestResourceService = {
                getEventResourceFactory: function() {
                    return {
                        create: function(data) {
                            return Promise.resolve({data: data});
                        },
                        update: (data) => {
                            return Promise.resolve({data: data});
                        },
                        list: () => {
                            return Promise.resolve({data: Mock.outcomeConfig});
                        },
                        deactivate: () => {
                            return Promise.resolve({data: Mock.outcomeConfig});
                        }
                    };
                }
            };
        }
    });
});
