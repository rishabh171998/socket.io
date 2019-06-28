var express=require('express');
var socket=require('socket.io');
var app=express();
var httpserver=require('http').createServer(app);
var port=process.env.PORT ||4000;
var server=httpserver.listen(port,function()
{
console.log("Port 4000  listening");

}


);

app.use(express.static('public'));

//Socket Setup

var io=socket(server);

io.on('connection',function(socket)
{

console.log('made connection',socket.id);

socket.on('chatMessage',function(data)
{

    io.sockets.emit('chat',data);

});
socket.on('feedback',function(data)
{
socket.broadcast.emit('typing',data);


});
socket.on('MouseLeave',function(data)
{
socket.broadcast.emit('empty',data);

});
});

