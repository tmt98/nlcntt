console.log('The server is runing ...');
// -->
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request,response){
    if (request.url == '/index.html' || request.url == '/'){
        response.writeHead(200,{
            "Context-type":"text/html",
            "author":"tranminhtai",
            "email":"tranminhtai1998@gmail.com"
        });
        fs.createReadStream('./index.html').pipe(response);
    }
    else {
        response.writeHead(404,{
            "Context-type":"text/html",
            "author":"tranminhtai",
            "email":"tranminhtai1998@gmail.com"
        });
        response.write('<h1>404 - Not Found ' + request.url+'</h1>');
        response.end();
    }
});

server.listen(8080, function(){
    console.log('Connected Succesfull!');
});