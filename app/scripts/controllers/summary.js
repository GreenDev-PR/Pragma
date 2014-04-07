'use strict';

angular.module('pragmaApp')
.controller('SummaryCtrl', function ($scope, cropSession) {
  $scope.data.cropSession = cropSession;
});
