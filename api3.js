const http = require("http");

http.createServer(function (req, res) {
    res.writeHead(200, { 'content-type': 'text/json' });  //

    let booklist = [
        {name:"HTML", cost:300},
        {name:"CSS", cost:400},
        {name:"JavaScript", cost:7878},
        {name:"PHP", cost:343},
        {name:"MySql", cost:2323}
    ];


    let jsonData = JSON.stringify(booklist);  // array to json 
    res.write(jsonData);
    res.end();

}).listen(1234, function(){ 
    console.log("Server Started on http://localhost:3333");
});


// http://localhost:1234