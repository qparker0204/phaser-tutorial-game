//get required modules and set up server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//deliver files depending on path
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/assets', express.static(__dirname + '/assets'));

//serve index.html as root page
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

//listen to port 8081
server.listen(8081,function(){
    console.log('Listening on ' + server.address().port);
});
