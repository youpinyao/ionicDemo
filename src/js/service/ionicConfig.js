angular.module('ionicConfig', []).run(['$rootScope', '$state', function($rootScope, $state) {

}]).config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(true);
  // $ionicConfigProvider.views.swipeBackHitWidth(50);
  // $ionicConfigProvider.views.transition('ios');

  $ionicConfigProvider.platform.ios.tabs.style('standard');
  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');

  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');

  $ionicConfigProvider.platform.ios.backButton.previousTitleText(false).text(
    ' ').icon('ion-ios-arrow-left');
  $ionicConfigProvider.platform.android.backButton.previousTitleText(false).text(
    ' ').icon('ion-ios-arrow-left');

  $ionicConfigProvider.platform.ios.views.transition('ios');
  $ionicConfigProvider.platform.android.views.transition('android');

  $ionicConfigProvider.platform.android.form.checkbox(null);
  $ionicConfigProvider.platform.android.form.toggle(null);

  $ionicConfigProvider.platform.ios.scrolling.jsScrolling(true);
  $ionicConfigProvider.platform.android.scrolling.jsScrolling(true);
}]);
