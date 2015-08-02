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

function MainCtrl($scope, $state) {
    console.log('hi')
};


(function () {
    angular.module('app', [
        'ui.router',                    // Routing
    ])
        .controller('MainCtrl', MainCtrl)
        .config(config)
        .run(function($rootScope, $state) {
            $rootScope.$state = $state
            $rootScope.$on("$stateChangeError", console.log.bind(console));

        });
})();
