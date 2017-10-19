
angular.module('app').controller('secondCtrl', controller);

controller.$inject = ['$scope'];

function controller($scope) {
  console.log('second controller');
}

export default {
  template: require('./index.html'),
  controller,
};
