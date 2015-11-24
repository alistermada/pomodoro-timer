angular
  .module('pomodoro-timer')
  .filter('ordinal', function() {
    return function(num) {
      var numString = num.toString();
      var lastDigit = numString[numString.length - 1];
      if (lastDigit === "1") {
        numString += "st";
      } else if (lastDigit === "2") {
        numString += "nd";
      } else if (lastDigit === "3") {
        numString += "rd";
      } else {
        numString += "th";
      }
      return numString;
    }
  });