!function(){angular.module("otusDomain",["dependencies","otusDomain.dashboard","otusDomain.authenticator","otusDomain.installer","otusDomain.repository","otusDomain.project","otusDomain.project.fieldCenter","otusDomainClient","otus.client","user","utils"])}(),function(){"use strict";angular.module("otusDomain.authenticator",[])}(),function(){angular.module("dependencies",["ngMaterial","ngMessages","ngAnimate","ui.mask","ui.router"])}(),function(){function e(e){e.formatDate=function(e){return moment(e).format("DD/MM/YYYY")},e.parseDate=function(e){var t=moment(e,"DD/MM/YYYY",!0);return t.isValid()?t.toDate():new Date(NaN)}}angular.module("otusDomain").config(["$mdDateLocaleProvider",e])}(),function(){function e(e,t,o){var n="app/dashboard/menu/dashboard-menu.html",r="app/dashboard/template/main-dashboard-template.html";e.state("installer",{url:"/installer",views:{"system-wrap":{templateUrl:"app/installer/initial/initial-config.html",controller:"InitialConfigController",controllerAs:"initialConfigController"},"repository-config@installer":{templateUrl:"app/survey-repository/repository.html"}}}).state("login",{url:"/login",views:{"system-wrap":{templateUrl:"app/authenticator/login/login.html",controller:"LoginController",controllerAs:"loginController"}}}).state("user-register",{url:"/user/register",views:{"system-wrap":{templateUrl:"app/user/management/registry/user-register.html",controller:"UserRegisterController",controllerAs:"userRegisterController"}}}).state("user-activation",{url:"/user/activation",views:{"system-wrap":{templateUrl:r,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@user-activation":{templateUrl:n},"system-content@user-activation":{templateUrl:"app/user/management/activation/user-activation.html",controller:"UserActivationController",controllerAs:"userActivationController"}}}).state("field-center",{url:"/project/centers",resolve:{loadCenters:function(e){e.loadCenters()}},views:{"system-wrap":{templateUrl:r,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@field-center":{templateUrl:n},"system-content@field-center":{templateUrl:"app/project/fieldCenter/field-center-template.html",controller:"FieldCenterController",controllerAs:"fieldCenterController"}}}).state("home",{url:"/home",resolve:{selectProject:function(e){e.initialChoose()}},views:{"system-wrap":{templateUrl:r,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@home":{templateUrl:n},"system-content@home":{templateUrl:"app/dashboard/template/dashboard-content-template.html"},"section-info@home":{templateUrl:"app/dashboard/home/home-info-section.html"},"section-view@home":{templateUrl:"app/dashboard/home/home-view-section.html"},"section-commands@home":{templateUrl:"app/dashboard/home/home-commands-section.html"}}}),t.otherwise("/login"),o.html5Mode(!0)}angular.module("otusDomain").config(["$stateProvider","$urlRouterProvider","$locationProvider",e]).constant("APP_STATE",{LOGIN:"login",USER_REGISTER:"user-register",INSTALLER:"installer",HOME:"home",USER_ACTIVATION:"user-activation",PROJECT_CENTER:"field-center"})}(),function(){function e(e,t){e.theme("layoutTheme").primaryPalette("blue",{default:"A200","hue-1":"200"}).accentPalette("blue-grey",{default:"900","hue-1":"50"}).warnPalette("red"),t.defaultIconSet("app/assets/img/icons/mdi.svg",24)}angular.module("otusDomain").config(["$mdThemingProvider","$mdIconProvider",e])}(),function(){"use strict";angular.module("otusDomain.dashboard",[])}(),function(){"use strict";angular.module("otusDomain.installer",["passwordControl"])}(),function(){"use strict";angular.module("otusDomain.project",[])}(),function(){"use strict";angular.module("otusDomain.repository",[])}(),function(){"use strict";angular.module("user",["user.management"])}(),function(){"use strict";function e(e,t,o,n){function r(){i()}function i(){var e=o.getInstallerResource();e.ready(function(e){e.data?t.goToLogin():t.goToInstaller()})}var a="Login Inválido! Verifique os dados informados.";r(),e.authenticate=function(e){var r=o.getAuthenticatorResource();r.authenticate(e,function(e){o.setSecurityToken(e.data),e.hasErrors?n.show(n.simple().textContent(a)):t.goToHome()})},e.register=function(){t.goToUserRegister()}}angular.module("otusDomain.authenticator").controller("LoginController",e),e.$inject=["$scope","DashboardStateService","RestResourceService","$mdToast"]}(),angular.module("passwordControl",[]).directive("stPassword",function(){return{require:"ngModel",restrict:"A",link:function(e,t,o,n){var r=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;e.$watch(function(){return n.$modelValue},function(e){r.test(e)&&e.length>=6&&e.length<=32?n.$setValidity("passwordPattern",!0):n.$setValidity("passwordPattern",!1)})}}}).directive("stPasswordMatch",function(){return{require:"ngModel",restrict:"A",scope:{stPasswordMatch:"="},link:function(e,t,o,n){function r(e,t){e!=t?n.$setValidity("passwordMatch",!1):n.$setValidity("passwordMatch",!0)}e.$watch(function(){return e.stPasswordMatch},function(e){r(e,n.$modelValue)}),e.$watch(function(){return n.$modelValue},function(t){r(e.stPasswordMatch,t)})}}}),function(){var e=angular.module("utils",[]);e.service("StringNormalizer",[function(){function e(e){for(var t=e.indexOf("-")!=-1?"-":".",o=e.split(t),n=o.length,r=o[0].toLowerCase(),i=1;i<n;i++){var a=o[i].slice(0,1),s=o[i].slice(1);r=r.concat(a.toUpperCase().concat(s.toLowerCase()))}return r}var t=this;t.normalizeString=e}])}(),function(){"use strict";function e(e,t,o,n,r){function i(){f.currentState="Login"}function a(){f.currentState="Login",e.go(o.LOGIN)}function s(){f.currentState="Instalador do Sistema",e.go(o.INSTALLER)}function c(){f.currentState="Cadastro de Usuário",e.go(o.USER_REGISTER)}function l(){f.currentState="Home",e.go(o.HOME)}function u(){f.currentState="Liberação de Usuários",e.go(o.USER_ACTIVATION)}function d(){f.currentState="Centros",e.go(o.PROJECT_CENTER)}function m(){var e=n.getAuthenticatorResource();e.invalidate(function(e){r.sessionStorage.clear(),a()})}var f=this;f.goToLogin=a,f.goToHome=l,f.goToInstaller=s,f.goToUserRegister=c,f.goToUserActivation=u,f.goToProjectCenters=d,f.logout=m,i()}angular.module("otusDomain.dashboard").service("DashboardStateService",e),e.$inject=["$state","$http","APP_STATE","RestResourceService","$window"]}(),function(){"use strict";function e(e,t,o){}angular.module("otusDomain.dashboard").controller("HomeController",e),e.$inject=["$http","$scope","$rootScope"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){return t.currentState}function a(){o("left").toggle()}function s(){o("left").close()}function c(){t.goToHome(),s()}function l(){t.goToSurveyForms(),s()}function u(){t.goToUserActivation(),s()}function d(){t.goToProjectCenters(),s()}function m(){e.showDialog().onConfirm(t.logout)}function f(){return r.hasProject()}function g(){return r.getCurrentProject()}function p(){n.choose()}var h=this;h.getSelectedSystemArea=i,h.open=a,h.close=s,h.openHome=c,h.openSurveyForms=l,h.openUserActivation=u,h.logout=m,h.chooseProject=p,h.hasSelectedProject=f,h.getCurrentProject=g,h.openProjectCenters=d}angular.module("otusDomain.dashboard").controller("DashboardMenuController",e),e.$inject=["LogoutDialogService","DashboardStateService","$mdSidenav","ProjectSelectionService","ProjectContext"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){l=r.getRepositoryResource(),u=r.getInstallerResource()}function a(){alert=o.alert().title("Informação").content("Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.").ok("ok"),o.show(alert).finally(function(){n.goToLogin()})}function s(e){t.initialConfigSystemForm.repositoryUsername.$setValidity("credentials",e),t.initialConfigSystemForm.repositoryPassword.$setValidity("credentials",e)}function c(e){t.initialConfigSystemForm.repositoryHost.$setValidity("connection",e),t.initialConfigSystemForm.repositoryPort.$setValidity("connection",e)}var l,u;i(),t.register=function(e){t.isLoading=!0,t.validateEmailService(e).then(function(){u.config(e,function(e){t.isLoading=!1,a()},function(){t.isLoading=!1})},function(){t.isLoading=!1})},t.validateEmailService=function(o){var n=e.defer();return u.validation(o,function(e){e.data?(t.resetValidationEmail(),n.resolve(!0)):(t.initialConfigSystemForm.emailSenderEmail.$setValidity("emailService",!1),n.reject(!1))}),n.promise},t.resetValidationEmail=function(){t.initialConfigSystemForm.emailSenderEmail.$setValidity("emailService",!0),t.initialConfigSystemForm.$setValidity("emailService",!0)},t.validateCredentials=function(e){l.validateCredentials(e,function(e){s(e.data)})},t.validateRepositoryConnection=function(e){l.validateConnection(e,function(e){c(e.data)})}}angular.module("otusDomain.installer").controller("InitialConfigController",e),e.$inject=["$q","$scope","$mdDialog","DashboardStateService","RestResourceService"]}(),function(){"use strict";function e(e){function t(e){a=e}function o(){return a}function n(){return null!==a}function r(t){var o=e.getOtusProjectResource();o.fetchAll(function(e){s=e.data,t(s)})}var i=this,a=null,s=[];i.setProject=t,i.hasProject=n,i.getCurrentProject=o,i.loadProjects=r}angular.module("otusDomain.project").service("ProjectContext",e),e.$inject=["RestResourceService"]}(),function(){"use strict";function e(e,t){function o(){e.hasProject()||n()}function n(){e.loadProjects(function(e){r(e)})}function r(e){t.show({controller:"ProjectChooseController as projectChoose",templateUrl:"app/project/context/dialog/project-choose-template.html",parent:angular.element(document.body),clickOutsideToClose:!0,fullscreen:!0,locals:{projects:e}})}var i=this;i.choose=n,i.initialChoose=o}angular.module("otusDomain.project").service("ProjectSelectionService",e),e.$inject=["ProjectContext","$mdDialog"]}(),function(){"use strict";function e(){function e(e){t.fieldCenters=e}var t=this;t.fieldCenters=[],t.setFieldCenters=e}angular.module("otusDomain.project.fieldCenter").service("ProjectFieldCenterContext",e)}(),function(){"use strict";function e(e,t,o){function n(){return e.getCenters()}function r(e){e.editMode=!e.editMode}function i(t){e.update(t,function(e){e.hasErrors||o.show(o.simple().textContent(s))})}function a(){t.show({templateUrl:"app/project/fieldCenter/dialog/create-field-center-template.html",clickOutsideToClose:!0,controller:"CreateFieldCenterController",controllerAs:"createFieldCenter"})}var s="Centro atualizado",c=this;c.getAllCenters=n,c.edit=r,c.create=a,c.update=i}angular.module("otusDomain.project.fieldCenter").controller("FieldCenterController",e),e.$inject=["ProjectFieldCenterService","$mdDialog","$mdToast"]}(),function(){"use strict";angular.module("otusDomain.project.fieldCenter",[])}(),function(){"use strict";function e(e,t,o){function n(){return t.fieldCenters}function r(){var o=e.getOtusFieldCenterResource();o.getAll(function(e){t.setFieldCenters(e.data)})}function i(t,o){var n=e.getOtusFieldCenterResource();n.create(t,function(e){r(),o(e)})}function a(t,o){delete t.editMode;var n=e.getOtusFieldCenterResource();n.update(t,function(e){r(),o(e)})}var s=this;s.loadCenters=r,s.getCenters=n,s.create=i,s.update=a}angular.module("otusDomain.project.fieldCenter").service("ProjectFieldCenterService",e),e.$inject=["OtusRestResourceService","ProjectFieldCenterContext","$q"]}(),function(){"use strict";function e(e,t,o){function n(t){e.setUrl(t.projectRestUrl);var o=e.getOtusInstallerResource();o.ready(function(e){t.status=e.data},function(e){t.status=!1})}function r(t,n){e.setUrl(t.projectRestUrl);var r=t.projectToken,i=e.getOtusAuthenticatorResource();i.authenticateProject(r,function(r){t.sessionToken=r.data,e.setSecurityProjectToken(t.sessionToken),o.setProject(t),n()})}var i=this;i.isOnline=n,i.authenticate=r}angular.module("otusDomain.project").service("ProjectSecurityService",e),e.$inject=["OtusRestResourceService","$q","ProjectContext"]}(),function(){"use strict";function e(e){function t(){a=e.getRepositoryResource()}function o(e){a.create(e,function(e){return!e.data.hasError})}function n(e){a.validateConnection(e,function(e){return e.data})}function r(e){a.getByRepositoryName({repositoryName:e.name},function(e){return e.data})}function i(e){a.validateCredentials(e,function(e){return e.data})}var a,s=this;s.createRepository=o,s.validateRepositoryConnection=n,s.validateIfRepositoryAlreadyExists=r,s.validateRepositoryCredentials=i,t()}angular.module("otusDomain.repository").service("RepositoryService",e),e.$inject=["RestResourceService"]}(),function(){"use strict";angular.module("user.management",["passwordControl"])}(),function(){"use strict";function e(e){function o(){a.dialogSettings={parent:angular.element(document.body),templateUrl:"app/dashboard/dialog/logout/logout-dialog.html",controller:t,controllerAs:"controller",openFrom:"#system-toolbar",closeTo:{bottom:0}}}function n(){return e.show(a.dialogSettings).then(r,i),{onConfirm:function(e){a.callback=e}}}function r(e){"confirm"==e.action&&a.callback&&a.callback(e.data)}function i(e){console.log(e)}var a=this;a.showDialog=n,o()}function t(e){function t(t){e.hide(t)}function o(t){e.hide(t)}var n=this;n.cancel=t,n.confirm=o}angular.module("otusDomain.dashboard").service("LogoutDialogService",e),e.$inject=["$mdDialog"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){s(self.projects)}function a(){t.cancel()}function s(e){e.forEach(function(e,t,o){n.isOnline(e)})}function c(e){e.status?n.authenticate(e,function(){a()}):l()}function l(){r.show(r.simple().textContent(u))}var u="Projeto Offline. Verifique o estado do projeto.";self=this,self.projects=o,self.close=a,self.select=c,i()}angular.module("otusDomain.project").controller("ProjectChooseController",e),e.$inject=["$scope","$mdDialog","projects","ProjectSecurityService","$mdToast"]}(),function(){"use strict";function e(e,t,o,n){function r(){t.cancel()}function i(e){o.create(e,function(t){t.hasErrors?a(e,t):(c(),r())})}function a(t,o){e.createForm.acronym.$setValidity(o.data.errorType,!1)}function s(){e.createForm.acronym.$setValidity("ALREADY_EXIST",!0)}function c(){n.show(n.simple().textContent(l))}var l="Centro Adicionado com Sucesso",u=this;u.close=r,u.create=i,u.resetValidation=s}angular.module("otusDomain.project.fieldCenter").controller("CreateFieldCenterController",e),e.$inject=["$scope","$mdDialog","ProjectFieldCenterService","$mdToast"]}(),function(){"use strict";function e(e,t,o,n,r,i){function a(e){e.enable?c(e):l(e)}function s(e){var t=r.confirm().title(m).textContent(d).ariaLabel(f).ok("Sim").cancel("Cancelar");r.show(t).then(function(t){a(e)},function(){e.enable=!e.enable})}function c(e){var t=n.getUserResource();t.enable(e,function(e){i.show(i.simple().textContent("Usuário habilitado.")),u()})}function l(e){var t=n.getUserResource();t.disable(e,function(e){i.show(i.simple().textContent("Usuário desabilitado.")),u()})}function u(){var e=n.getUserResource();e.fetch(function(e){t.users=e.data})}var d="Você tem certeza que deseja alterar o status do usuário ?",m="Mudança de Estatus",f="Mudança de Status";t.users=[],t.loadUsers=u(),t.changeStatus=a,t.confirmDialog=s}angular.module("user.management").controller("UserActivationController",e),e.$inject=["$http","$scope","$filter","RestResourceService","$mdDialog","$mdToast"]}(),function(){function e(e,t,o,n){function r(e){var t=n.getUserResource();t.create(e,function(e){a()})}function i(){o.goToLogin()}function a(){alert=t.alert().title("Informação").content("Sua liberação está pendente de aprovação.").ok("ok"),t.show(alert).finally(function(){o.goToLogin()})}var s=this;s.register=r,s.back=i}angular.module("user.management").controller("UserRegisterController",e),e.$inject=["$http","$mdDialog","DashboardStateService","RestResourceService"],angular.module("user.management").directive("unique",["$http","$q","RestResourceService",function(e,t,o){return{restrict:"A",require:"ngModel",link:function(e,n,r,i){i.$asyncValidators.emailInUse=function(e,n){var r=t.defer(),i=o.getUserResource();return i.exists({email:e},function(e){e.data?r.reject():r.resolve()}),r.promise}}}}])}();