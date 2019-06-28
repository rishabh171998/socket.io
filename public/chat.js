//Make connection
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');


var socket=io();//invoke connection event
message.addEventListener('mouseleave',function()
{
feedback.innerHTML="";
socket.emit('MouseLeave',feedback.value);
});

//emit events
message.addEventListener('keypress',function()
{
    socket.emit('feedback',handle.value);


});
btn.addEventListener('click',function()
{
 socket.emit('chatMessage',{
    message:message.value,
    handle:handle.value
    
 });   
    message.value="";
});

//Listen for events

socket.on('chat',function(data)
{
    feedback.innerHTML="";
    output.innerHTML+='<p><strong>'+ data.handle +':</strong>'+ data.message + '</p>';
});

socket.on('typing',function(data)
{

feedback.innerHTML="<p><em>"+data+'is typing a message</em></p>';

});

socket.on('empty',function(data)
{

feedback.innerHTML="";

});