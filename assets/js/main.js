console.log('mian.js loaded')

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
            templateUrl: "views/personalData.html"
        })
        .state('index.property', {
            url: "/property",
            templateUrl: "views/property.html"
        })
        .state('index.company', {
            url: "/company",
            templateUrl: "views/company.html"
        })
        .state('index.vehicle', {
            url: "/vehicle",
            templateUrl: "views/vehicle.html"
        })
        .state('index.textAdjustment', {
            url: "/vehicle"
        })
}

function MainCtrl($scope) {
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

};

function PersonalDataCtrl($scope, $http) {
    $http.get('assets/data/personalData.json').
        success(function(data, status, headers, config) {
            $scope.data = data
            l = data.lenght
            $scope.dataRowOne = data.slice(0,4);
            $scope.dataRowTwo = data.slice(5,l);
        }).
        error(function(data, status, headers, config) {
            console.error(data)
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

};

function CompanyCtrl($scope, $http) {
    $http.get('assets/data/company.json').
        success(function(data, status, headers, config) {
            $scope.data = data;
        }).
        error(function(data, status, headers, config) {
            console.error(data)
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
}

function minimalizaSidebar($timeout) {
    return {
        restrict: 'A',
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: function ($scope, $element) {

        }
    };
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
        .config(config)
        .run(function($rootScope, $state) {
            $rootScope.$state = $state
            $rootScope.$on("$stateChangeError", console.log.bind(console));

        });
})();
