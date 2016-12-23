var app = angular.module('starter', ['ionic']);

app.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/slide');
    $stateProvider
    .state('slide', {
      url: '/slide',
      templateUrl: 'views/slide.html'
    })
      .state('home', {
        url: '/home',
        templateUrl: '/views/home.html'
      })
      .state('details', {
        url: '/datails/:id',
        templateUrl: '/views/datails.html',
        controller: "DetailController"
      })
  })
