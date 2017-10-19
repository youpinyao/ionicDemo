// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
import './vendor.js';
import '../scss/app.scss';

import './service/convertToAjax.js';
import './service/ionicConfig.js';

const app = angular.module('app', ['ionic', 'convertToAjax', 'ionicConfig']);
const router = require('./router').default;

app.run(['$ionicPlatform', '$rootScope', '$ionicHistory', '$ionicViewSwitcher', '$state',
  '$timeout',
  function($ionicPlatform, $rootScope, $ionicHistory, $ionicViewSwitcher, $state, $timeout) {
    $ionicPlatform.ready(function() {
      // 隐藏欢迎界面
      $timeout(function() {
        if (window.navigator.splashscreen) {
          window.navigator.splashscreen.hide();
        }
        console.log('cordova splashscreen');
      }, ionic.Platform.isIOS() ? 0 : 1000);

      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleLightContent();
      }
    });

    window.ionicHistory = $ionicHistory;
  }
]);

app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js

    router.forEach(route => {
      $stateProvider.state(route.state, {
        url: route.url,
        views: {
          container: {
            ...route,
          },
        },
      });
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tabs');
  }
]);

angular.bootstrap(document.body, ['app']);
