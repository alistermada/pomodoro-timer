angular
  .module('pomodoro-timer', [])
  .controller('TimerController', ['$scope', '$interval', '$filter', function($scope, $interval, $filter) {
    $scope.timerRunning = false;
    $scope.pomodoro = 25;
    $scope.shortBreak = 5;
    $scope.longBreak = 20;
    $scope.currentSession = 'pomodoro';
    $scope.pomodoroNumber = 1;
    $scope.time = $scope[$scope.currentSession] * 60000;
    var sessionTypes = ['pomodoro', 'shortBreak', 'longBreak'];
    var setArray = [];
    var pomodorosPerSet = 4;
    var sessionIndex = 0;

    //Define a set of 4 pomodoros with 3 short breaks and 1 long break in between
    for (var i = 1; i <= pomodorosPerSet; i++) {
      setArray.push('pomodoro');
      setArray.push(i === pomodorosPerSet ? 'longBreak' : 'shortBreak');
    };

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

    $scope.highlight = function($event) {
      $event.currentTarget.select();
    }

    $scope.startTimer = function() {
      if (!$scope.timerRunning) {
        $scope.timer = $interval(function(){
          $scope.time -= 1000;
          updateProgressBar();
        }, 1000);
        $scope.timerRunning = true;
        document.title = 'Session: ' + $filter('titlecase')($scope.currentSession);
      }
    }

    $scope.stopTimer = function(reset) {
      if ($scope.timerRunning) {
        $interval.cancel($scope.timer);
        $scope.timerRunning = false;
        document.title = 'Pomodoro Timer';
      }
      if (reset) {
        resetTime();
      }
    }

    $scope.nextSession = function() {
      sessionIndex < setArray.length - 1 ? sessionIndex++ : sessionIndex = 0;
      updateCurrentSession();
    }

    $scope.previousSession = function() {
      sessionIndex > 0 ? sessionIndex-- : sessionIndex = setArray.length - 1;
      updateCurrentSession();
    }

    function updateCurrentSession() {
      $scope.pomodoroNumber = Math.floor((sessionIndex + 2) / 2);
      $scope.currentSession = setArray[sessionIndex];
      document.title = 'Session: ' + $filter('titlecase')($scope.currentSession);
      updateProgressBar();
      resetTime();
    }

    function playTimerBeep() {
      document.getElementById("timerBeep").play();
    }

    function resetTime() {
      $scope.time = $scope[$scope.currentSession] * 60000;
    }

    function updateProgressBar() {
      var progressBar =  document.getElementById('progressBar');
      var percent = $scope.time / ($scope[$scope.currentSession] * 60000);
      var barLength = Math.floor(percent * 566);
      progressBar.style.strokeDashoffset = barLength + 'px';
    }
  }]);