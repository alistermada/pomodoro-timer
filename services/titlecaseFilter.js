angular
  .module('pomodoro-timer')
  .filter('titlecase', function() {
    return function (str) {
      str = str.replace(/(\b\w)|(\B[A-Z])/g, function(m){
        return " " + m.toUpperCase();
      });
      return str.trim();
    } 
  });