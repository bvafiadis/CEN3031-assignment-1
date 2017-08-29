var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {		//what happens when the server is accessed
	var parsedUrl = url.parse(request.url);		//main url
	
	var pathname = url.parse(request.url).pathname;		//part after main url
	if( pathname == '/listings' ){
		response.writeHead(200, {'Content-Type': 'text/plain'});		//200 heading, means that it's working
		response.end(listingData);		//returns listingData
	}
	else{
		response.writeHead(404, {'Content-Type': 'text/plain'});		//404 heading if not at /listings
		response.end('Bad gateway error');		//returns bad gateway error
	}
  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
};

fs.readFile('listings.json', 'utf8', function(err, data) {		//reads the listings.json file
  listingData = data;		//save json data into listingData
  
  server = http.createServer(requestHandler).listen(port);		//creates and starts server
  
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
});
