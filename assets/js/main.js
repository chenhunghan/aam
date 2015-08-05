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
