'use strict';

angular.module('coordsonarApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.randomMarkers = [];
    $http.get('/api/coords/target').success(function(nearCoordinates) {
      $scope.randomMarkers = nearCoordinates;
    });

    $scope.map = {
      // LDZ - default coords
      center: { latitude: 51.75168965, longitude: 19.46846008 }, 
      zoom: 9,
      events: {
        click: function (mapModel, eventName, originalEventArgs) {
          var e = originalEventArgs[0];
          var lat = e.latLng.lat(),
            lng = e.latLng.lng();
          $http.post('/api/coords/target', { lat: lat, lng: lng }).success(function(nearCoordinates) {
            $scope.randomMarkers = nearCoordinates;
          });
          $scope.$apply();
        }
      }
    };

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
