'use strict';

angular.module('pragmaApp')
.controller('SummaryCtrl', function ($scope, CropTypes, cropSession, cropTypes) {
  $scope.data.cropSession = cropSession;

  $scope.getCropSessionLength = function() {
    var cropSession = $scope.data.cropSession;
    return cropSession.initialStageLength + cropSession.developmentStageLength +
        cropSession.midStageLength + cropSession.lateStageLength;
  };

  $scope.getCropTypeName = function() {
    var cropSession = $scope.data.cropSession;
    return CropTypes.getCropType(cropSession.cropTypeId, cropTypes).cropType;
  };
});
