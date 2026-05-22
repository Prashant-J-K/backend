const http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/html' });  //

    res.write("<h1> Welcome to Nodejs </h1>");
    res.end();

}).listen(1234, function(){ 
    console.log("Server Started on http://localhost:1111");
});


// http://localhost:1234