describe('FollowUp Rest Service', function () {
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
                service = _$injector_.get('FollowUpRestService');
                service.initialize();

            });
        });

        describe('initialize method', function () {
            beforeEach(function () {
                spyOn(service, 'initialize').and.callThrough();
                spyOn(Injections.OtusRestResourceService, 'getFollowUpResourceFactory').and.callThrough();
                service.initialize();
            });

            it('should initialize be defined', function () {
                expect(service.initialize).toHaveBeenCalled();
                expect(service.initialize).not.toBeNull();
                expect(Injections.OtusRestResourceService.getFollowUpResourceFactory).toHaveBeenCalled();
            });

        });

        describe('add method', function () {
            beforeEach(function () {
                spyOn(service, 'add').and.callThrough();
                service.add();

            });

            it('should add be defined', function () {
                expect(service.add).toHaveBeenCalled();
                expect(service.add).not.toBeNull();
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

            it('should list be defined', function () {
                expect(service.list).toHaveBeenCalled();
                expect(service.list).not.toBeNull();
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
                getFollowUpResourceFactory: function() {
                    return {
                        add: function(data) {
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
