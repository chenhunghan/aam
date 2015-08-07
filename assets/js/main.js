
function config($stateProvider, $urlRouterProvider) {

    $urlRouterProvider
        .when('', '/index/personalData')
        .otherwise("/index/404");

    $stateProvider
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
        .state('index.404', {
            url: "/404",
            templateUrl: "views/404.html",
            data: { pageTitle: 'Not Found' }
        })
        .state('index.personalData', {
            url: "/personalData",
            templateUrl: "views/personalData.html",
            controller: 'PersonalDataCtrl as person',
        })
        .state('index.property', {
            url: "/property",
            templateUrl: "views/property.html",
            controller: 'PropertyCtrl as property',
        })
        .state('index.company', {
            url: "/company",
            templateUrl: "views/company.html",
            controller: 'CompanyCtrl as company',
        })
        .state('index.vehicle', {
            url: "/vehicle",
            templateUrl: "views/vehicle.html",
            controller: 'VehicleCtrl as vehicle',
        })
        .state('index.textAdjustment', {
            url: "/textzoom",
        })
}

function MainCtrl($scope, $rootScope) {
    var isCatalogOpen = false
    $scope.toogleSlide = function () {
        o = 145
        t = 92
        if (isCatalogOpen === false) {
            isCatalogOpen = !isCatalogOpen
            console.log('animate!')
            TweenMax.to(".navText", 0.5, {opacity: '0'});
            TweenMax.to(".navDownload", 0.5, {opacity: '0'});

            TweenMax.to(".navPersonal", 0.5, {opacity: '1',  left: (o+t) + 'px'});
            TweenMax.to(".navProperty", 0.8, {opacity: '1', left: (o+t*2.2) + 'px'});
            TweenMax.to(".navCompany", 1.2, {opacity: '1', left: (o+t*3.4) + 'px'});
            TweenMax.to(".navVehicle", 1.5, {opacity: '1', left: (o+t*4.6) + 'px'});
        } else {
            isCatalogOpen = !isCatalogOpen
            TweenMax.to(".navText", 2, {opacity: '1'});
            TweenMax.to(".navDownload", 2, {opacity: '1'});
            TweenMax.to(".navPersonal", 0.5, {opacity: '0',  left: o + 'px'});
            TweenMax.to(".navProperty", 1.5, {opacity: '0', left: o + 'px'});
            TweenMax.to(".navCompany", 2, {opacity: '0', left: o + 'px'});
            TweenMax.to(".navVehicle", 2, {opacity: '0', left: o + 'px'});
        }
    }
    $rootScope.$on('$viewContentLoading',
        function(event, viewConfig){
            console.log('loading....')
        })

};

function PersonalDataCtrl($scope, $http, $timeout) {
    $http.get('assets/data/personalData.json').
        success(function(data, status, headers, config) {
            $scope.data = data

        }).
        error(function(data, status, headers, config) {
            console.error(data)
        });
    $scope.$on('$viewContentLoaded', function(event){
        console.log('Person is loaded')
        $('.personal001').addClass('personal001Enter')
    });





};

function PropertyCtrl($scope, $http) {
    $http.get('assets/data/property.json').
        success(function(data, status, headers, config) {
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            console.error(data)
        });
    $scope.$on('$viewContentLoaded', function(event){
        console.log('Property is loaded')
    });
};

function CompanyCtrl($scope, $http) {
    $http.get('assets/data/company.json').
        success(function(data, status, headers, config) {
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            console.error(data)
        });
    $scope.$on('$viewContentLoaded', function(event){
        console.log('Company is loaded')
    });

};

function VehicleCtrl($scope, $http){
    $http.get('assets/data/vehicle.json').
        success(function(data, status, headers, config) {
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            console.error(data)
        });
    $scope.$on('$viewContentLoaded', function(event){
        console.log('Vehicle is loaded')
    });
}

function shadow ($timeout) {
    return {
        link: function(scope, element) {
            element.bind('mouseenter', function() {
                TweenMax.to(element, .3, {
                    textShadow: "5px 5px 1px rgba(0, 0, 0, 0.2)",
                });
            })
            element.bind('mouseleave', function() {
                TweenMax.to(element, .2, {
                    textShadow: "0px 0px 0px",
                });
            })
        }
    }
};

(function () {
    angular.module('app', [
        'ui.router',                    // Routing
    ])
        .controller('MainCtrl', MainCtrl)
        .controller('PersonalDataCtrl', PersonalDataCtrl)
        .controller('PropertyCtrl', PropertyCtrl)
        .controller('CompanyCtrl', CompanyCtrl)
        .controller('VehicleCtrl', VehicleCtrl)
        .directive('shadow', shadow)
        .config(config)
        .run(function($rootScope, $state) {
            $rootScope.$state = $state
            $rootScope.$on("$stateChangeError", console.log.bind(console));

        });
})();
