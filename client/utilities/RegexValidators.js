import moment from 'moment';
var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
var displayNameRegex = /^[a-zA-Z\-\_0-9]+$/; //alphanumerics, "-" and "_"
var passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,}$/; // At least 6 characters

/**
	*	Given a trimmed string, returns true if the string matches
	* a proper email format.
	*/
export function validateEmail(email) {
	return emailRegex.test(email);
}


/**
	*	Given a trimmed string, returns true if the string contains at
	* least one valid character (alphanumerics)
	*/
export function validateDisplayName(displayName) {
	return displayNameRegex.test(displayName);
}


/**
	*	Given a trimmed string, returns true if the string contains at
	* least 6 valid character (alphanumerics and !@#$%^&*)
	*/
export function validatePassword(password) {
	return passwordRegex.test(password);
}

export function validateDate(dateStr){
	var d = moment(dateStr,'D/M/YYYY');
    if(d == null || !d.isValid()) return false;
    return true;
}



export function timeSince(time) {
	console.log('================');
	console.log(time);
	console.log('***********');
var templates = {
        prefix: "",
        suffix: " ago",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years"
    };
    var template = function(t, n) {
        return templates[t] && templates[t].replace(/%d/i, Math.abs(Math.round(n)));
    };

    var timer = function(time) {
        if (!time)
            return;
        time = time.replace(/\.\d+/, ""); // remove milliseconds
        time = time.replace(/-/, "/").replace(/-/, "/");
        time = time.replace(/T/, " ").replace(/Z/, " UTC");
        time = time.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2"); // -04:00 -> -0400
        time = new Date(time * 1000 || time);

        var now = new Date();
        var seconds = ((now.getTime() - time) * .001) >> 0;
        var minutes = seconds / 60;
        var hours = minutes / 60;
        var days = hours / 24;
        var years = days / 365;

        return templates.prefix + (
                seconds < 45 && template('seconds', seconds) ||
                seconds < 90 && template('minute', 1) ||
                minutes < 45 && template('minutes', minutes) ||
                minutes < 90 && template('hour', 1) ||
                hours < 24 && template('hours', hours) ||
                hours < 42 && template('day', 1) ||
                days < 30 && template('days', days) ||
                days < 45 && template('month', 1) ||
                days < 365 && template('months', days / 30) ||
                years < 1.5 && template('year', 1) ||
                template('years', years)
                ) + templates.suffix;
    };

}

export function formatter(value, unit, suffix, rawTime) {
  var counter = '';
  //console.log('minnnnnnnnnnn'+value);
  var minunit = 'minute';
  if (value > 1) {
    minunit = 'minutes'
  }
  var year = unit === ('year') ? value : 0
  var month = unit === ('month') ? value : 0
  var week = unit === ('week') ? value : 0
  var day = unit === ('day') ? value : 0
  var hour = unit === ('hour') ? value : 0
  var minute = unit === ('minute') ? value : 0
  var second = unit === ('second') ? value : 0
  if(year==0 && month==0 && week==0 && day==0 && hour==0 && minute==0){
     counter = 'Just now';
  } else if(year==0 && month==0 && week==0 && day==0 && hour==0 && minute>0){
     counter = `${minute} ${minunit} ago`;
  }else if(year==0 && month==0 && week==0 && day==0 && hour>0){
     counter = `${hour} ${unit} ago`;
  }else if(year==0 && month==0 && week==0 && day==1){
      var timestamp = moment(rawTime);
      var formatted = timestamp.format('hh a');
      counter = formatted+' Yesterday';
  }else{
    var timestamp = moment(rawTime);
      var formatted = timestamp.format('DD MMM hh:mma');
      counter = formatted;
  }

  return counter;
}
