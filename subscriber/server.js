const http = require('http');

const server = http.createServer(function(req, res){
    if(req.method === 'POST'){
        let body = "";
        req.on("data", function (chunk) {
            body += chunk;
         
        });

        req.on("end", function(){
            console.log(body);
            res.writeHead(200, { "Content-Type": "appication/json" });
            res.end(body);
        });
    }else{
        res.statusCode = 404;
        res.end();
    }
});

server.listen(9000);