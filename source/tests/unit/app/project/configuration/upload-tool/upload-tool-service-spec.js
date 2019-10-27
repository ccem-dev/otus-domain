 describe('otusjs.otus-domain.project.configuration.UploadToolService', function() {
    var Mock = {};
    var service;

    beforeEach(function() {
        angular.mock.module('otusDomain.project.configuration');

        inject(function(_$injector_) {
            service = _$injector_.get('otusjs.otus-domain.project.configuration.UploadToolService');
        });
    });

    describe('input type acceptance resolver', function() {
        it('should be defined', function() {
            expect(service.uploadTypeResolver).toBeDefined();
        });

        it('should return jpg when type = image', function() {
            var accept = service.uploadTypeResolver('image');
            expect(accept).toContain("image/*");
        });

        it('should return right acceptance even with extra spaces', function() {
            var accept = service.uploadTypeResolver(' image  ,    json');
            expect(accept).toContain('.json');
            expect(accept).toContain('image/*');
        });

        it('should accept any format when empty value as parameter', function() {
            var accept = service.uploadTypeResolver();
            expect(accept).toEqual('any');
        });

        it('should accept any format when a wrong value as parameter', function() {
            var accept = service.uploadTypeResolver('asd');
            expect(accept).toEqual('any');
        });
    });

});
