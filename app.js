var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res) {
    res.sendfile('index.html');
 });
 
usernames = [];

//Whenever someone connects this gets executed
io.on('connection', function(socket) {
    console.log('A user connected');

    //Checking if username exits or not
     socket.on('setusername', function(data){
         if(usernames.indexOf(data) == -1)
         {
             usernames.push(data);
             socket.emit('usernameSet', data)
         }
         else
         socket.emit('usernameTaken', data + ' is already taken. Try again.')

     });


     //someone added a new message
     socket.on('sendmsg', function(data){
         io.sockets.emit('broadcast', data)
     });
 
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
       console.log('A user disconnected');
    });
 });
 


http.listen(3000, function(){
    console.log("listening on localhost:3000");
})