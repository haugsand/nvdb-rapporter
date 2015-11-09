var app = angular.module('rapportgenerator', ['ngRoute']);


app.config(['$httpProvider', function ($httpProvider) {
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
}]);


app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('!');
}]);
    
    
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/rapport', {
            templateUrl: 'rapportoppsett.html',
            controller: 'rapportCtrl',
            reloadOnSearch: false
        }).
        otherwise({
            templateUrl: 'velkomstside.html',
            controller: 'velkomstsideCtrl'
        });
}]);


app.constant('nvdbapi', 'api.php?path=');


app.run(['$rootScope', 'getdata', function($rootScope, getdata) {

    $rootScope.objekttyper = {};
    $rootScope.egenskapstyper = {};
    $rootScope.valg = {};

    getdata.region();
    
    // getdata.fylke();
    // getdata.kommune();
    
    getdata.fylke().then(function(promise) {
        getdata.kommune();
    });
    
    getdata.vegreferanse();
    
}]);