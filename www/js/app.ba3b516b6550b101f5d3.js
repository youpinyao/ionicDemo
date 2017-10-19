webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("cbRa");


/***/ }),

/***/ "4h6G":
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<!--\nCreate tabs with an icon and label, using the tabs-positive style.\nEach tab's child <ion-nav-view> directive will have its own\nnavigation history that also transitions its views in and out.\n-->\n<ion-view>\n  <ion-pane>\n    <ion-tabs class=\"tabs-icon-top tabs-color-active-positive\"\n      delegate-handle=\"main-tabs\">\n\n      <ion-tab title=\"Status\"\n        icon-off=\"ion-ios-pulse\"\n        icon-on=\"ion-ios-pulse-strong\"\n        ng-click=\"selectTab(0)\">\n        " + __webpack_require__("zPdR") + "\n      </ion-tab>\n\n      <ion-tab title=\"Chats\"\n        icon-off=\"ion-ios-chatboxes-outline\"\n        icon-on=\"ion-ios-chatboxes\"\n        ng-click=\"selectTab(1)\">\n        " + __webpack_require__("R7SN") + "\n      </ion-tab>\n\n      <ion-tab title=\"Account\"\n        icon-off=\"ion-ios-gear-outline\"\n        icon-on=\"ion-ios-gear\"\n        ng-click=\"selectTab(2)\">\n        " + __webpack_require__("xrBk") + "\n      </ion-tab>\n\n      <ion-tab title=\"Account\"\n        icon-off=\"ion-ios-gear-outline\"\n        icon-on=\"ion-ios-gear\"\n        ng-click=\"selectTab(3)\">\n        " + __webpack_require__("mHcg") + "\n      </ion-tab>\n    </ion-tabs>\n  </ion-pane>\n</ion-view>\n";

/***/ }),

/***/ "5X96":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app').controller('tab4Ctrl', controller);

controller.$inject = [];

function controller() {
  console.log('tab4 controller');
}

/***/ }),

/***/ "8Jzp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__("SENd");

__webpack_require__("ImwJ");

__webpack_require__("qnRR");

__webpack_require__("5X96");

angular.module('app').controller('tabsCtrl', controller);

controller.$inject = ['$scope', '$ionicTabsDelegate'];

function controller($scope, $ionicTabsDelegate) {
  $scope.selectTab = selectTab;

  function selectTab(i) {
    $ionicTabsDelegate.$getByHandle('main-tabs').select(i, true);
  }
}

exports['default'] = {
  template: __webpack_require__("4h6G"),
  controller: controller
};

/***/ }),

/***/ "GAXL":
/***/ (function(module, exports) {

module.exports = "<ion-view>\n  <ion-header-bar align-title=\"center\"\n    class=\"bar-positive\">\n    <div class=\"buttons\">\n      <button class=\"button ion-ios-arrow-left\"\n        ng-click=\"$ionicGoBack()\"></button>\n    </div>\n    <h1 class=\"title\">second</h1>\n  </ion-header-bar>\n  <ion-content>\n    second page\n  </ion-content>\n</ion-view>\n";

/***/ }),

/***/ "Ghny":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('ionicConfig', []).run(['$rootScope', '$state', function ($rootScope, $state) {}]).config(['$ionicConfigProvider', function ($ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(true);
  // $ionicConfigProvider.views.swipeBackHitWidth(50);
  // $ionicConfigProvider.views.transition('ios');

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText(false).text(' ').icon('ion-ios-arrow-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText(false).text(' ').icon('ion-ios-arrow-left');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $ionicConfigProvider.platform.android.form.checkbox(null);
  $ionicConfigProvider.platform.android.form.toggle(null);

  $ionicConfigProvider.platform.ios.scrolling.jsScrolling(true);
  $ionicConfigProvider.platform.android.scrolling.jsScrolling(true);
}]);

/***/ }),

/***/ "ImwJ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app').controller('tab2Ctrl', controller);

controller.$inject = [];

function controller() {
  console.log('tab2 controller');
}

/***/ }),

/***/ "JTbs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('convertToAjax', []).run().config(['$httpProvider', function ($httpProvider) {
  // 转为 ajax 请求
  var transformRequest = function transformRequest(obj) {
    var query = '';
    var name = void 0;
    var value = void 0;
    var fullSubName = void 0;
    var subName = void 0;
    var subValue = void 0;
    var innerObj = void 0;
    var i = void 0;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += transformRequest(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += transformRequest(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  };

  $httpProvider.defaults.transformRequest = function (data) {
    return angular.isObject(data) && String(data) !== '[object File]' ? transformRequest(data) : data;
  };
}]);

/***/ }),

/***/ "NbH0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

angular.module('app').controller('secondCtrl', controller);

controller.$inject = ['$scope'];

function controller($scope) {
  console.log('second controller');
}

exports['default'] = {
  template: __webpack_require__("GAXL"),
  controller: controller
};

/***/ }),

/***/ "R7SN":
/***/ (function(module, exports) {

module.exports = "<ion-view ng-controller=\"tab2Ctrl\">\n  <ion-content>\n  tab2\n  </ion-content>\n</ion-view>\n";

/***/ }),

/***/ "SENd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app').controller('tab1Ctrl', controller);

controller.$inject = [];

function controller() {
  console.log('tab1 controller');
}

/***/ }),

/***/ "Vp6e":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "aWmp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _tabs = __webpack_require__("8Jzp");

var _tabs2 = _interopRequireDefault(_tabs);

var _second = __webpack_require__("NbH0");

var _second2 = _interopRequireDefault(_second);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var router = [_extends({
  state: 'tabs',
  url: '/tabs'
}, _tabs2['default']), _extends({
  state: 'second',
  url: '/second'
}, _second2['default'])];

exports['default'] = router;

/***/ }),

/***/ "cbRa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


__webpack_require__("5j21");

__webpack_require__("Vp6e");

__webpack_require__("JTbs");

__webpack_require__("Ghny");

var app = angular.module('app', ['ionic', 'convertToAjax', 'ionicConfig']);
var router = __webpack_require__("aWmp")['default'];

app.run(['$ionicPlatform', '$rootScope', '$ionicHistory', '$ionicViewSwitcher', '$state', function ($ionicPlatform, $rootScope, $ionicHistory, $ionicViewSwitcher, $state) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  window.ionicHistory = $ionicHistory;
}]);

app.config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js

  router.forEach(function (route) {
    $stateProvider.state(route.state, {
      url: route.url,
      views: {
        container: _extends({}, route)
      }
    });
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs');
}]);

angular.bootstrap(document.body, ['app']);

/***/ }),

/***/ "mHcg":
/***/ (function(module, exports) {

module.exports = "<ion-view ng-controller=\"tab4Ctrl\">\n  <ion-content>\n  tab4\n  </ion-content>\n</ion-view>\n";

/***/ }),

/***/ "qnRR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('app').controller('tab3Ctrl', controller);

controller.$inject = [];

function controller() {
  console.log('tab3 controller');
}

/***/ }),

/***/ "xrBk":
/***/ (function(module, exports) {

module.exports = "<ion-view ng-controller=\"tab3Ctrl\">\n  <ion-content>\n  tab3\n  </ion-content>\n</ion-view>\n";

/***/ }),

/***/ "zPdR":
/***/ (function(module, exports) {

module.exports = "<ion-view ng-controller=\"tab1Ctrl\">\n  <ion-content>\n  tab1\n  <a href=\"#/second\">to second</a>\n  </ion-content>\n</ion-view>\n";

/***/ })

},[0]);