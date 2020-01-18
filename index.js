 /*Importing from modules from express, socket.io, and ejs*/
 const express = require('express');
 const app = express();
 const http = require('http').Server(app);
 const io = require('socket.io')(http);

/*Render the main javascript found in index.js*/
 app.get('/', function(req, res) {
     res.render('index.ejs');
 });

 io.sockets.on('connection', function(socket) {
     socket.on('username', function(username) {
        //Get the username and display it to the chat
         socket.username = username;
         io.emit('is_online', '💓<i>' + socket.username + ' is online...</i>');
     });

     socket.on('disconnect', function(username) {
         io.emit('is_online', '💓<i>' + socket.username + ' is offline...</i>');
     })

     socket.on('chat_message', function(message) {
         io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
     });

 });

/*Hosted in http://localhost:8080 */
 const server = http.listen(8080, function() {
     console.log('go to localhost to view');
 }); 
