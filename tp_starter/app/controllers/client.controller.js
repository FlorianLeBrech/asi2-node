var socket = io.connect(); 



function listen(server,reponse) { 
    io.on('connection', function(socket){

        io.emit("data_com", socket.io.engine.id);                                        
        
    })
}