!function(){angular.module("otusDomain",["dependencies","otusDomain.dashboard","otusDomain.authenticator","otusDomain.installer","otusDomain.repository","otusDomain.project","otusDomainClient","otus.client","user","utils"])}(),function(){"use strict";angular.module("otusDomain.authenticator",[])}(),function(){angular.module("dependencies",["ngMaterial","ngMessages","ngAnimate","ui.mask","ui.router"])}(),function(){function e(e){e.formatDate=function(e){return moment(e).format("DD/MM/YYYY")},e.parseDate=function(e){var t=moment(e,"DD/MM/YYYY",!0);return t.isValid()?t.toDate():new Date(NaN)}}angular.module("otusDomain").config(["$mdDateLocaleProvider",e])}(),function(){function e(e,t,o){var n="app/dashboard/menu/dashboard-menu.html",r="app/dashboard/template/main-dashboard-template.html";e.state("installer",{url:"/installer",views:{"system-wrap":{templateUrl:"app/installer/initial/initial-config.html",controller:"InitialConfigController",controllerAs:"initialConfigController"},"repository-config@installer":{templateUrl:"app/survey-repository/repository.html"}}}).state("login",{url:"/login",views:{"system-wrap":{templateUrl:"app/authenticator/login/login.html",controller:"LoginController",controllerAs:"loginController"}}}).state("user-register",{url:"/user/register",views:{"system-wrap":{templateUrl:"app/user/management/registry/user-register.html",controller:"UserRegisterController",controllerAs:"userRegisterController"}}}).state("user-activation",{url:"/user/activation",views:{"system-wrap":{templateUrl:r,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@user-activation":{templateUrl:n},"system-content@user-activation":{templateUrl:"app/user/management/activation/user-activation.html",controller:"UserActivationController",controllerAs:"userActivationController"}}}).state("home",{url:"/home",resolve:{selectProject:function(e){e.initialChoose()}},views:{"system-wrap":{templateUrl:r,controller:"DashboardMenuController as dashboardMenu"},"dashboard-menu@home":{templateUrl:n},"system-content@home":{templateUrl:"app/dashboard/template/dashboard-content-template.html"},"section-info@home":{templateUrl:"app/dashboard/home/home-info-section.html"},"section-view@home":{templateUrl:"app/dashboard/home/home-view-section.html"},"section-commands@home":{templateUrl:"app/dashboard/home/home-commands-section.html"}}}),t.otherwise("/login"),o.html5Mode(!0)}angular.module("otusDomain").config(["$stateProvider","$urlRouterProvider","$locationProvider",e]).constant("APP_STATE",{LOGIN:"login",USER_REGISTER:"user-register",INSTALLER:"installer",HOME:"home",USER_ACTIVATION:"user-activation"})}(),function(){function e(e,t){e.theme("layoutTheme").primaryPalette("blue",{"default":"A200","hue-1":"200"}).accentPalette("blue-grey",{"default":"900","hue-1":"50"}).warnPalette("red"),t.defaultIconSet("app/assets/img/icons/mdi.svg",24)}angular.module("otusDomain").config(["$mdThemingProvider","$mdIconProvider",e])}(),function(){"use strict";angular.module("otusDomain.dashboard",[])}(),function(){"use strict";angular.module("otusDomain.installer",["passwordControl"])}(),function(){"use strict";angular.module("otusDomain.project",[])}(),function(){"use strict";angular.module("otusDomain.repository",[])}(),function(){"use strict";angular.module("user",["user.management"])}(),function(){"use strict";function e(e,t,o,n){function r(){i()}function i(){var e=o.getInstallerResource();e.ready(function(e){e.data?t.goToLogin():t.goToInstaller()})}var a="Login Inválido! Verifique os dados informados.";r(),e.authenticate=function(e){var r=o.getAuthenticatorResource();r.authenticate(e,function(e){o.setSecurityToken(e.data),e.hasErrors?n.show(n.simple().textContent(a)):t.goToHome()})},e.register=function(){t.goToUserRegister()}}angular.module("otusDomain.authenticator").controller("LoginController",e),e.$inject=["$scope","DashboardStateService","RestResourceService","$mdToast"]}(),angular.module("passwordControl",[]).directive("stPassword",function(){return{require:"ngModel",restrict:"A",link:function(e,t,o,n){var r=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;e.$watch(function(){return n.$modelValue},function(e){r.test(e)&&e.length>=6&&e.length<=32?n.$setValidity("passwordPattern",!0):n.$setValidity("passwordPattern",!1)})}}}).directive("stPasswordMatch",function(){return{require:"ngModel",restrict:"A",scope:{stPasswordMatch:"="},link:function(e,t,o,n){function r(e,t){e!=t?n.$setValidity("passwordMatch",!1):n.$setValidity("passwordMatch",!0)}e.$watch(function(){return e.stPasswordMatch},function(e){r(e,n.$modelValue)}),e.$watch(function(){return n.$modelValue},function(t){r(e.stPasswordMatch,t)})}}}),function(){var e=angular.module("utils",[]);e.service("StringNormalizer",[function(){function e(e){for(var t=-1!=e.indexOf("-")?"-":".",o=e.split(t),n=o.length,r=o[0].toLowerCase(),i=1;n>i;i++){var a=o[i].slice(0,1),s=o[i].slice(1);r=r.concat(a.toUpperCase().concat(s.toLowerCase()))}return r}var t=this;t.normalizeString=e}])}(),function(){"use strict";function e(e,t,o,n,r){function i(){m.currentState="Login"}function a(){m.currentState="Login",e.go(o.LOGIN)}function s(){m.currentState="Instalador do Sistema",e.go(o.INSTALLER)}function c(){m.currentState="Cadastro de Usuário",e.go(o.USER_REGISTER)}function l(){m.currentState="Home",e.go(o.HOME)}function u(){m.currentState="Liberação de Usuários",e.go(o.USER_ACTIVATION)}function d(){var e=n.getAuthenticatorResource();e.invalidate(function(e){r.sessionStorage.clear(),a()})}var m=this;m.goToLogin=a,m.goToHome=l,m.goToInstaller=s,m.goToUserRegister=c,m.goToUserActivation=u,m.logout=d,i()}angular.module("otusDomain.dashboard").service("DashboardStateService",e),e.$inject=["$state","$http","APP_STATE","RestResourceService","$window"]}(),function(){"use strict";function e(e,t,o){}angular.module("otusDomain.dashboard").controller("HomeController",e),e.$inject=["$http","$scope","$rootScope"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){return t.currentState}function a(){o("left").toggle()}function s(){o("left").close()}function c(){t.goToHome(),s()}function l(){t.goToSurveyForms(),s()}function u(){t.goToUserActivation(),s()}function d(){e.showDialog().onConfirm(t.logout)}function m(){return r.hasProject()}function f(){return r.getCurrentProject()}function g(){n.choose()}var h=this;h.getSelectedSystemArea=i,h.open=a,h.close=s,h.openHome=c,h.openSurveyForms=l,h.openUserActivation=u,h.logout=d,h.chooseProject=g,h.hasSelectedProject=m,h.getCurrentProject=f}angular.module("otusDomain.dashboard").controller("DashboardMenuController",e),e.$inject=["LogoutDialogService","DashboardStateService","$mdSidenav","ProjectSelectionService","ProjectContext"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){l=r.getRepositoryResource(),u=r.getInstallerResource()}function a(){alert=o.alert().title("Informação").content("Seu cadastro foi realizado com sucesso! Você vai ser redirecionado para a tela de login.").ok("ok"),o.show(alert)["finally"](function(){n.goToLogin()})}function s(e){t.initialConfigSystemForm.repositoryUsername.$setValidity("credentials",e),t.initialConfigSystemForm.repositoryPassword.$setValidity("credentials",e)}function c(e){t.initialConfigSystemForm.repositoryHost.$setValidity("connection",e),t.initialConfigSystemForm.repositoryPort.$setValidity("connection",e)}var l,u;i(),t.register=function(e){t.isLoading=!0,t.validateEmailService(e).then(function(){u.config(e,function(e){t.isLoading=!1,a()},function(){t.isLoading=!1})},function(){t.isLoading=!1})},t.validateEmailService=function(o){var n=e.defer();return u.validation(o,function(e){e.data?(t.resetValidationEmail(),n.resolve(!0)):(t.initialConfigSystemForm.emailSenderEmail.$setValidity("emailService",!1),n.reject(!1))}),n.promise},t.resetValidationEmail=function(){t.initialConfigSystemForm.emailSenderEmail.$setValidity("emailService",!0),t.initialConfigSystemForm.$setValidity("emailService",!0)},t.validateCredentials=function(e){l.validateCredentials(e,function(e){s(e.data)})},t.validateRepositoryConnection=function(e){l.validateConnection(e,function(e){c(e.data)})}}angular.module("otusDomain.installer").controller("InitialConfigController",e),e.$inject=["$q","$scope","$mdDialog","DashboardStateService","RestResourceService"]}(),function(){"use strict";function e(){function e(e){r=e}function t(){return r}function o(){return null!==r}var n=this,r=null;n.setProject=e,n.hasProject=o,n.getCurrentProject=t}angular.module("otusDomain.project").service("ProjectContext",e)}(),function(){"use strict";function e(e,t,o){function n(){c=o.getOtusProjectResource()}function r(){e.hasProject()||i()}function i(){s(function(t){u.projects=t.data,u.selected=e.setProject,a()})}function a(){t.show({controller:"ProjectChooseController",templateUrl:"app/project/context/dialog/project-choose-template.html",parent:angular.element(document.body),clickOutsideToClose:!0,fullscreen:!0,locals:{context:u}})}function s(e){c.fetchAll(e)}var c,l=this,u={};l.choose=i,l.initialChoose=r,n()}angular.module("otusDomain.project").service("ProjectSelectionService",e),e.$inject=["ProjectContext","$mdDialog","RestResourceService"]}(),function(){"use strict";function e(e,t){function o(t){e.setUrl(t.projectRestUrl);var o=e.getOtusInstallerResource();o.ready(function(e){e.data?t.status=!0:t.status=!1},function(e){t.status=!1})}var n=this;n.isOnline=o}angular.module("otusDomain.project").service("ProjectSecurityService",e),e.$inject=["OtusRestResourceService","$q"]}(),function(){"use strict";function e(e){function t(){a=e.getRepositoryResource()}function o(e){a.create(e,function(e){return!e.data.hasError})}function n(e){a.validateConnection(e,function(e){return e.data})}function r(e){a.getByRepositoryName({repositoryName:e.name},function(e){return e.data})}function i(e){a.validateCredentials(e,function(e){return e.data})}var a,s=this;s.createRepository=o,s.validateRepositoryConnection=n,s.validateIfRepositoryAlreadyExists=r,s.validateRepositoryCredentials=i,t()}angular.module("otusDomain.repository").service("RepositoryService",e),e.$inject=["RestResourceService"]}(),function(){"use strict";angular.module("user.management",["passwordControl"])}(),function(){"use strict";function e(e){function o(){a.dialogSettings={parent:angular.element(document.body),templateUrl:"app/dashboard/dialog/logout/logout-dialog.html",controller:t,controllerAs:"controller",openFrom:"#system-toolbar",closeTo:{bottom:0}}}function n(){return e.show(a.dialogSettings).then(r,i),{onConfirm:function(e){a.callback=e}}}function r(e){"confirm"==e.action&&a.callback&&a.callback(e.data)}function i(e){console.log(e)}var a=this;a.showDialog=n,o()}function t(e){function t(t){e.hide(t)}function o(t){e.hide(t)}var n=this;n.cancel=t,n.confirm=o}angular.module("otusDomain.dashboard").service("LogoutDialogService",e),e.$inject=["$mdDialog"]}(),function(){"use strict";function e(e,t,o,n,r){function i(){a(e.context.projects)}function a(e){e.forEach(function(e,t,o){n.isOnline(e)})}function s(){t.cancel()}function c(t){t.status?(e.context.selected(t),s()):r.show(r.simple().textContent(l))}var l="Projeto Offline. Verifique o estado do projeto.";e.close=s,e.context=o,e.select=c,i()}angular.module("otusDomain.project").controller("ProjectChooseController",e),e.$inject=["$scope","$mdDialog","context","ProjectSecurityService","$mdToast"]}(),function(){"use strict";function e(e,t,o,n){function r(e){return o("filter")(e,{selected:!0})}function i(){var e=n.getUserResource();e.fetch(function(e){t.users.disabledUsers=e.data.disabledUsers,t.users.activedUsers=e.data.activedUsers})}t.users=[],t.users.disabledUsers=[],t.users.activedUsers=[],t.loadUsers=i(),t.enableUsers=function(){var e=r(t.users.disabledUsers);if(e.length>0){var o=n.getUserResource();o.enable(e,function(e){i()})}},t.disableUsers=function(){var e=r(t.users.activedUsers);if(e.length>0){var o=n.getUserResource();o.disable(e,function(e){i()})}}}angular.module("user.management").controller("UserActivationController",e),e.$inject=["$http","$scope","$filter","RestResourceService"]}(),function(){function e(e,t,o,n){function r(e){var t=n.getUserResource();t.create(e,function(e){a()})}function i(){o.goToLogin()}function a(){alert=t.alert().title("Informação").content("Sua liberação está pendente de aprovação.").ok("ok"),t.show(alert)["finally"](function(){o.goToLogin()})}var s=this;s.register=r,s.back=i}"http://"+window.location.hostname;angular.module("user.management").controller("UserRegisterController",e),e.$inject=["$http","$mdDialog","DashboardStateService","RestResourceService"],angular.module("user.management").directive("unique",["$http","$q","RestResourceService",function(e,t,o){return{restrict:"A",require:"ngModel",link:function(e,n,r,i){i.$asyncValidators.emailInUse=function(e,n){var r=t.defer(),i=o.getUserResource();return i.exists({email:e},function(e){e.data?r.reject():r.resolve()}),r.promise}}}}])}();