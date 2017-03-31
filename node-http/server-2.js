var http = require('http');

var fs = require('fs');

var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
  
    console.log('Request from' + req.url + 'by Method' + req.method);
    
    if (req.method == 'GET') {
        
        var fileUrl;
        
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;
        
        var filePath = path.resolve('./public'+fileUrl);
        
        var fileExt = path.extname(filePath);
        
        if (fileExt == '.html'){
            
            fs.exists(filePath, function(exists){
               
                if (!exists){
                    
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    
                    res.end('<h1>Error 404 ' + fileUrl + ' Not found</h1>');
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                
                fs.createReadStream(filePath).pipe(res);
            });
        } else {
            
            res.writeHead(404, {'Content-Type': 'text/html'});
                    
            res.end('<h1>Error 404 ' + fileUrl + ' Not a HTML File</h1>');
        }
    } else {
        
        res.writeHead(404, {'Content-Type': 'text/html'});
                    
        res.end('<h1>Error 404 ' + req.method + ' Not Allowed</h1>');
    }
    
  });
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});