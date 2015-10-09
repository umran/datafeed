/*

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});*/

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// serve static files from the public folder
app.use(express.static('public'));

app.get('/datafeed', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log('client connected');
  
  //for testing purposes only
  
  socket.on('data', function (data) {
    var dataPlot = data.split(',');
    console.log("timestamp: "+dataPlot[0]+", X: "+dataPlot[1]+", Y: "+dataPlot[2]+", Z: "+dataPlot[3]);
    socket.broadcast.emit('dataPlot', dataPlot);
  });
});

server.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});