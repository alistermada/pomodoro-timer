angular
  .module('pomodoro-timer', [])
  .controller('TimerController', ['$scope', '$interval', function($scope, $interval) {
    $scope.timerRunning = false;
    $scope.pomodoro = 25;
    $scope.shortBreak = 5;
    $scope.longBreak = 20;
    $scope.session = "pomodoro";
    $scope.pomodorosPerSet = 4;
    $scope.pomodoroNumber = 1;

    $scope.$watch('time', function() {
      if ($scope.time <= 0) {
        $scope.nextSession();
      }
    });

    $scope.$watchGroup(['pomodoro', 'shortBreak', 'longBreak'], function(newValue) {
      resetTime();
    });

    $scope.startTimer = function() {
      console.log($scope.value);
      if (!$scope.timerRunning) {
        $scope.timer = $interval(function(){
          $scope.time -= 1000;
        }, 1000);
        $scope.timerRunning = true;
      }
    }

    $scope.stopTimer = function(reset) {
      if ($scope.timerRunning) {
        $interval.cancel($scope.timer);
        $scope.timerRunning = false;
      }
      if (reset) {
        resetTime(); 
      }
    }

    $scope.nextSession = function() {
      if ($scope.session === "pomodoro") {
        if ($scope.pomodoroNumber === $scope.pomodorosPerSet) {
          $scope.session = "longBreak";
          $scope.pomodoroNumber = 0;
        } else {
          $scope.session = "shortBreak";
        }
      } else {
        $scope.session = "pomodoro";
        $scope.pomodoroNumber += 1;
      }
      
      resetTime();
    }

    function resetTime() {
      $scope.time = $scope[$scope.session] * 60 * 1000;
    }
  }]);