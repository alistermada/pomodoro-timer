angular
  .module('pomodoro-timer', [])
  .controller('TimerController', ['$scope', '$interval', function($scope, $interval) {
    $scope.timerRunning = false;
    $scope.pomodoro = 25;
    $scope.shortBreak = 5;
    $scope.longBreak = 20;
    $scope.currentSession = 'pomodoro';
    $scope.pomodorosPerSet = 4;
    $scope.pomodoroNumber = 1;
    $scope.time = $scope[$scope.currentSession] * 60000;
    var sessions = ['pomodoro', 'shortBreak', 'longBreak'];

    $scope.$watch('time', function() {
      if ($scope.time <= 0) {
        $scope.nextSession();
      }
    });

    $scope.$watchGroup(sessions, function(newValue, oldValue) {
      for (var i = 0; i < sessions.length; i++) {
        if (newValue[i] !== oldValue[i] && sessions[i] === $scope.currentSession) {
          updateTime();
        }
      }
    });

    $scope.highlight = function($event) {
      $event.currentTarget.select();
    }

    $scope.startTimer = function() {
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
      if ($scope.currentSession === "pomodoro") {
        if ($scope.pomodoroNumber === $scope.pomodorosPerSet) {
          $scope.currentSession = "longBreak";
          $scope.pomodoroNumber = 0;
        } else {
          $scope.currentSession = "shortBreak";
        }
      } else {
        $scope.currentSession = "pomodoro";
        $scope.pomodoroNumber += 1;
      }
      
      resetTime();
      playTimerBeep();
    }

    function playTimerBeep() {
      document.getElementById("timerBeep").play();
    }

    function resetTime() {
      $scope.time = $scope[$scope.currentSession] * 60000;
    }

    function updateTime() {
      var remainingSeconds = $scope.time % 60000;
      resetTime();
      $scope.time += remainingSeconds;
    }
  }]);