var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
   res.send("Use this miniservice to get the unix and natural date of a given unix or natural time stamp, sent as a single parameter.") 
});

app.get('/:timestamp', function(req,res) {
    // Make a date.
    var time = new Date(req.params.timestamp);
    // Dirty error catching. Retry, just to be sure.
    if (isNaN(time.valueOf())) {
        time = new Date(Number(req.params.timestamp))
    }
    function formatDate(date) {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July", 
            "August", "September", "October",
            "November", "December"];
        var day = date.getDate();
        var month = monthNames[date.getMonth()];
        var year = date.getFullYear();
        return month + " " + day + ", " + year;
    }
    // So, is time a valid time? If not, reply with null, otherwise hey here's some dates for ya.
    var responseDates = !isNaN(time.valueOf()) ? {unix: time.valueOf(), natural: formatDate(time)} : {unix: null, natural: null };
    res.send(JSON.stringify(responseDates));
});

app.listen(app.get('port'), function(){
    console.log("Listening on 8080.");
});