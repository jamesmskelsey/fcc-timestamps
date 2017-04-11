var express = require('express');
var app = express();

app.get('/', function(req,res) {
    res.send("<html><body><h1>Hello, world!</h1></body></html>");
});

app.listen(8080, function(){
    console.log("Listening on 8080.");
});