import './tab1';
import './tab2';
import './tab3';
import './tab4';

angular.module('app').controller('tabsCtrl', controller);

controller.$inject = ['$scope', '$ionicTabsDelegate'];

function controller($scope, $ionicTabsDelegate) {
  $scope.selectTab = selectTab;

  function selectTab(i) {
    $ionicTabsDelegate.$getByHandle('main-tabs').select(i, true);
  }
}

export default {
  template: require('./index.html'),
  controller,
};

