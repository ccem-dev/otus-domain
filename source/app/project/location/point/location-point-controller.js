(function () {
    'use strict';

    angular
        .module('otusDomain.project.location')
        .controller('locationPointCtrl', Controller);


    Controller.$inject = ['RestResourceService', 'otusjs.model.locationPoint.LocationPointFactory', 'LocationPointService', 'ProjectFieldCenterService', '$mdToast'];

    function Controller(RestResourceService, LocationPointFactory, LocationPointService, ProjectFieldCenterService, $mdToast) {

        var self = this;
        self.$onInit = onInit;
        self.select = select;
        self.showDestinationRegister = false;
        self.addLocationPoint = addLocationPoint;
        self.removeUser = removeUser;
        self.save = save;
        self.cancel = cancel;
        self.getLabelSelected = getLabelSelected;
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.removeLocation = removeLocation;
        self.saveUser = saveUser;
        self.safeMode = true;
        self.destination = [];
        var _rest;


        function onInit() {
            _rest = RestResourceService.getUserResource();
            _getAllConfiguration();
        }

        function _getAllConfiguration() {
            LocationPointService.getAll().then(function (response) {
                self.locationsPoints = LocationPointFactory.fromArray(response["data"].transportLocationPoints);
                _clearData();
            });
        }

        function select(index, destination) {
            self.selectedLocationPoint = destination;
            self.selectedIndex = index;
            self.showLocationRegister = true;
            self.safeMode = false;
            _listUsers();
        }

        function addLocationPoint() {
            self.showLocationRegister = true;
            self.selectedLocationPoint = LocationPointFactory.create();
            self.safeMode = true;
        }

        function save() {
            if (self.safeMode) {
                LocationPointService.saveLocationPoint(self.selectedLocationPoint.toJSON()).then(function (response) {
                    self.locationsPoints.push(LocationPointFactory.fromJsonObject(response.data));
                    _getAllConfiguration();
                    _messageShow('Localização salva com sucesso.');
                }).catch(function () {
                    _messageShow('Não foi possível salvar localização! Tente novamente mais tarde.');

                });
            } else {
                LocationPointService.updateLocationPoint(self.selectedLocationPoint.toJSON()).then(function (response) {
                    self.locationsPoints.splice(self.selectedIndex, 1);
                    self.locationsPoints.splice(self.selectedIndex, 0, LocationPointFactory.fromJsonObject(response.data));
                    _getAllConfiguration();
                    _messageShow('Localização atualizada com sucesso.');
                }).catch(function () {
                    _messageShow('Não foi possível atualizar localização! Tente novamente mais tarde.');
                });
            }
        }

        function removeLocation() {
            LocationPointService.removeLocation(self.selectedLocationPoint.toJSON()).then(function (response) {
                if (response.data) {
                    self.locationsPoints.splice(self.selectedIndex, 1);
                    _clearData();
                    _messageShow('Localização removida com sucesso.');
                }
            }).catch(function () {
                _messageShow('Não foi possível remover a localização.');
            });
        }

        function cancel() {
            _clearData();
        }

        function getLabelSelected(user) {
            return user.name.concat(" (").concat(user.email).concat(")");
        }

        function _clearData() {
            self.query = "";
            delete self.selectedItem;
            delete self.selectedLocationPoint;
            delete self.selectedIndex;
            self.showLocationRegister = false;
            self.locationsPoints.sort(_getSortOrder('name'));
        }

        function _getSortOrder(prop) {
            return function (a, b) {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
                return 0;
            }
        }

        function _listUsers() {
            _rest.list(function (response) {
                self.allUsers = angular.copy(response.data);
                self.users = response.data.filter(function (user) {
                    return user.enable === true && !_existUser(user.email);
                });
            });
        }


        function querySearch(query) {
            var results = query ? self.users.filter(createFilterFor(query)) : self.users;
            return results;
        }

        function _existUser(email) {
            return self.selectedLocationPoint.users.includes(email)
        }


        function selectedItemChange(user) {
            self.selectedUser = user;
        }

        function saveUser() {
            if (self.selectedUser){
                LocationPointService.saveUserLocation(self.selectedLocationPoint, self.selectedUser).then(function (response) {
                    self.selectedLocationPoint.setUser(self.selectedUser.email);
                    delete self.selectedItem;
                    _messageShow('Usuário salvo com sucesso.');
                }).catch(function () {
                    _messageShow('Não foi possível salvar usuário! Tente novamente mais tarde.');
                });
            }
        }

        function removeUser(email) {
            var _user = self.allUsers.find(function (user) {
                return user.email === email;
            });
            LocationPointService.removeUserLocation(self.selectedLocationPoint, _user).then(function (response) {
                self.selectedLocationPoint.removeUser(email);
                _listUsers();
                _messageShow('Usuário removido com sucesso.');
            }).catch(function () {
                _messageShow('Não foi possível remover usuário! Tente novamente mais tarde.');
            });
        }

        function createFilterFor(query) {
            var lowercaseQuery = query.toLowerCase();

            return function filterFn(user) {
                return (user.name.toLowerCase().indexOf(lowercaseQuery) > -1) || (user.email.toLowerCase().indexOf(lowercaseQuery) > -1);
            };
        }

        function _messageShow(content) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(content)
                    .hideDelay(3000)
            );
        }
    }

}());
