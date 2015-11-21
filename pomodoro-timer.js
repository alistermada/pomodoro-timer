angular
  .module('pomodoro-timer', [])
  .controller('TimerController', ['$scope', '$interval', function($scope, $interval) {
    $scope.pomodoroLength = 25;
    $scope.shortBreakLength = 5;
    $scope.longBreakLength = 20;
    $scope.session = "pomodoro";
    $scope.$watchGroup(['pomodoroLength', 'shortBreakLength', 'longBreakLength'], function() {
      $scope.time = $scope[$scope.session + "Length"] * 60 * 1000;
    });
    var timerRunning = false;
    $scope.toggleTimer = function() {
      if (timerRunning) {
        $interval.cancel($scope.timer);
        timerRunning = false;
      } else {
        $scope.timer = $interval(function(){
          $scope.time -= 1000;
        }, 1000);
        timerRunning = true;
      }
    }
  }]);