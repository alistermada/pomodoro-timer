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
    $scope.timePercent = 0;
    var sessionTypes = ['pomodoro', 'shortBreak', 'longBreak'];
    var sessionIndex = 0;

    $scope.$watch('time', function() {
      if ($scope.time <= 0 && $scope.timerRunning) {
        $scope.nextSession();
        playTimerBeep();
      }
    });

    $scope.$watchGroup(sessionTypes, function(newValue, oldValue) {
      for (var i = 0; i < sessionTypes.length; i++) {
        if (newValue[i] !== oldValue[i] && sessionTypes[i] === $scope.currentSession) {
          resetTime();
        }
      }
    });

    $scope.$watch('pomodorosPerSet', function(newValue) {
      $scope.setArray = [];
      for (var i = 1; i <= $scope.pomodorosPerSet; i++) {
        $scope.setArray.push('pomodoro');
        $scope.setArray.push(i === $scope.pomodorosPerSet ? 'longBreak' : 'shortBreak');
      };
    });

    $scope.highlight = function($event) {
      $event.currentTarget.select();
    }

    $scope.startTimer = function() {
      if (!$scope.timerRunning) {
        $scope.timer = $interval(function(){
          $scope.time -= 200;
          updateTimerProgress();
        }, 200);
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
      updateTimerProgress();
    }

    $scope.nextSession = function() {
      sessionIndex < $scope.setArray.length - 1 ? sessionIndex++ : sessionIndex = 0;
      updateCurrentSession();
    }

    $scope.previousSession = function() {
      sessionIndex > 0 ? sessionIndex-- : sessionIndex = $scope.setArray.length - 1;
      updateCurrentSession();
    }

    function updateCurrentSession() {
      $scope.pomodoroNumber = Math.floor((sessionIndex + 2) / 2);
      $scope.currentSession = $scope.setArray[sessionIndex];
      resetTime();
    }

    function playTimerBeep() {
      document.getElementById("timerBeep").play();
    }

    function resetTime() {
      $scope.time = $scope[$scope.currentSession] * 60000;
    }

    function updateTimerProgress() {
      var progress =  document.getElementById('timerProgress');
      var percent = $scope.time / ($scope[$scope.currentSession] * 60000);
      var progressLength = Math.floor(percent * 252);
      progress.style.strokeDashoffset = progressLength + 'px';
    }
  }]);