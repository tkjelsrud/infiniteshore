var express = require('express');
var app = express();

app.use(express.static('.'));

//Serves all the request which includes /images in the url from Images folder
app.use('/resources', express.static(__dirname + '/resources'));

var server = app.listen(3000);
