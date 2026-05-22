const http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/json' });  //
    let booklist = ['html', 'css', 'mysql', 'php', 'nodejs', 'react'];
    let jsonData = JSON.stringify(booklist);  // array to json 
    res.write(jsonData);
    res.end();

}).listen(1234, function(){ 
    console.log("Server Started on http://localhost:2222");
});


// http://localhost:1234