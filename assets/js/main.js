
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
            controller: 'textCtrl as text',
        })
}

function loading() {
    //function hide() {
    //    tl.to(".titleAnimated", 2, {opacity: 0})
    //}
    //tl = new TimelineMax({onComplete:hide})
    //tl.to(".titleAnimated", 0.25, {opacity: 1});
}

function MainCtrl($scope, $rootScope) {

    var isCatalogOpen = false
    $scope.toogleSlide = function () {
        o = 145
        t = 92
        if (isCatalogOpen === false) {
            isCatalogOpen = !isCatalogOpen

            TweenMax.to(".navDownload", 0.5, {opacity: '0', 'z-index': -1});
            TweenMax.to(".navPersonal", 0.5, {opacity: '1',  left: (o+t) + 'px'});
            TweenMax.to(".navProperty", 0.8, {opacity: '1', left: (o+t*2.2) + 'px'});
            TweenMax.to(".navCompany", 1.2, {opacity: '1', left: (o+t*3.4) + 'px'});
            TweenMax.to(".navVehicle", 1.5, {opacity: '1', left: (o+t*4.6) + 'px'});
            TweenMax.to(".navText", 1.5, {opacity: '1', left: (o+t*5.8) + 'px'});


        } else {
            isCatalogOpen = !isCatalogOpen
            TweenMax.to(".navText", 1.5, {opacity: '1', left: (o+t) + 'px'});
            TweenMax.to(".navDownload", 2, {opacity: '1', 'z-index': 2});
            TweenMax.to(".navPersonal", 0.5, {opacity: '0',  left: o + 'px'});
            TweenMax.to(".navProperty", 1.5, {opacity: '0', left: o + 'px'});
            TweenMax.to(".navCompany", 2, {opacity: '0', left: o + 'px'});
            TweenMax.to(".navVehicle", 2, {opacity: '0', left: o + 'px'});


        }
    }

    var isZoom = false
    $scope.toogleZoom = function () {
        if (isZoom === false) {
            isZoom = !isZoom
            TweenMax.to(".itemKey", 0.1, {fontSize: 18 + 'px'});
            TweenMax.to(".itemValue", 0.1, {fontSize: 16 + 'px'});
        } else {
            isZoom = !isZoom
            TweenMax.to(".itemKey", 0.1, {fontSize: 15 + 'px'});
            TweenMax.to(".itemValue", 0.1, {fontSize: 14 + 'px'});

        }
    }

    $rootScope.$on('$viewContentLoading',
        function(event, viewConfig){
        })

};

function PersonalDataCtrl($scope, $http, $timeout) {

    $http.get('assets/data/personalData.json').
        success(function(data, status, headers, config) {
            $scope.dataRowOne = data.slice(0, 3)
            $scope.dataRowTwo = data.slice(3, 99)
        }).
        error(function(data, status, headers, config) {
            console.error(data)
        });
    $scope.$on('$viewContentLoaded', function(event){
        $('.personal001').addClass('personal001Enter');
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
        TweenMax.to(".property1", 2, {top: '0px'});
        TweenMax.to(".property2", 0.5, {top: '349px'});
        TweenMax.to(".property3", 0.8, {top: '307px'});
        TweenMax.to(".property4", 1.2, {top: '224px'});
        TweenMax.to(".property5", 1.5, {top: '196px'});
        TweenMax.to(".property6", 1.8, {top: '141px'});
        TweenMax.to(".property7", 1.9, {top: '66px'});

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
        TweenMax.to(".cash001", 0.5, {top: '10%', right: '7%'});
        TweenMax.to(".cash002", 0.5, {top: '45%', right:'8%' });
    })

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

function addhover ($timeout) {
    return {
        link: function(scope, element) {
            element.bind('mouseenter', function() {
                TweenMax.to(element, .75, {
                    backgroundColor:'rgba(0,0,0,0.035)'
                });
                TweenMax.to(element, 1.5, {
                    borderRadius:"20px 20px 20px"
                });

            })
            element.bind('mouseleave', function() {
                TweenMax.to(element, 2, {
                    backgroundColor:'rgba(0,0,0,0)',
                    borderRadius:"0px 0px 0px"
                });
            })
        }
    }
};

function getBlur(element, blurAmount) {
    var blurElement = {a:0};
    TweenMax.to(blurElement, 1, {a:blurAmount, onUpdate:applyBlur});
    function applyBlur()
    {
        TweenMax.set(element, {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
    };
    TweenMax.to(element, 1, {opacity: 0.5})
}

function getClear(element, blurAmount) {
    var blurElement = {a:blurAmount};
    TweenMax.to(blurElement, 1, {a:0, onUpdate:applyBlur});
    function applyBlur()
    {
        TweenMax.set(element, {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
    };
    TweenMax.to(element, 1, {opacity: 1})
}
function addblurhover () {
    return {
        link: function(scope, element) {
            var blurAmount = 3
            element.bind('mouseenter', function() {
                getBlur(element, blurAmount)
            })
            element.bind('mouseleave', function() {
                getClear(element, blurAmount)
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
        .directive('addhover', addhover)
        .directive('addblurhover', addblurhover)
        .config(config)
        .run(function($rootScope, $state) {
            $rootScope.$state = $state
            //$rootScope.$on("$stateChangeError", console.log.bind(console));

        });
})();

