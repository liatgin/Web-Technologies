var fs = require("fs");

var myHTTPServer = require('./hujiwebserver');
//myHTTPServer.use(function(rq,rs,next){rs.set("Content-Type", "text/plain");});
myHTTPServer.use('/hello/world', function(rq,rs){rs.set("Content-Type", "text/plain");rs.send("hello world")});
myHTTPServer.use('/add/:n/:m', function(rq,rs){rs.json({result:rq.params.n*rq.params.m})});

myHTTPServer.use('/filez/*', function(rq,rs){
	
	var pathname = 'filez/' + rq.params.star;
	if (pathname.endsWith('.js'))
	{
		rs.set("Content-Type", "application/javascript");
	}
	else if (pathname.endsWith('.css'))
	{
		rs.set("Content-Type", "text/css");
	}
	else if (pathname.endsWith('.html'))
	{
		rs.set("Content-Type", "text/html");
	}
		
	
	var content = "";
	// First I want to read the file
	fs.readFile(pathname, 'utf8',function read(err, data) 
	{
		
		if (err) 
		{
			rs.protocol = 500;
			rs.send();
		}
		else {
			content = data;
			//console.log(content)
			rs.send(content);
		}
	});

	}).start(8080);