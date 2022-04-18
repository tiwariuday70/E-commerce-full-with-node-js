const fs= require('fs');

const requestHandler=(req, res)  => {
    const url=req.url;
    const method= req.method;
    if(url==='/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    
    
        }
        if(url==='/message' && method==='POST'){
            const body=[];
            req.on('data', chunk => {
                console.log(chunk);
                body.push(chunk);
                
            }); //on is used to create event here we created data event
            return req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const message = parsedBody.split('=')[1];
                fs.writeFile('message.txt', message, err => {
                  res.statusCode = 302;
                  res.setHeader('Location', '/');
                  return res.end();
                    
                });
            //  });
            
            // fs.writeFileSync('message.txt', 'DUMMY');
          
        });
    
       
    
        }
    
        
        res.setHeader('Content-Type', 'text/html');
        // process.exit();
        res.write('<html>');
        res.write('<head><title> My first page</title></head>');
        res.write('<body><h1> Hello from node js server</h1></body>')
        res.write('</html>');
        res.end();
    };
// module.exports=requestHandler;
    // module.exports={
    //     handler:requestHandler,
    //     someText:'Somne hard coded text'
    // };
    
// module.exports.handler= requestHandler;
// module.exports.someText='Some hard coded text';

exports.handler= requestHandler;
exports.someText='Some hard coded text';