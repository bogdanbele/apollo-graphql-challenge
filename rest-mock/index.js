import jsonServer from 'json-server'

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = 3333

server.use(jsonServer.bodyParser)
server.use(middlewares)


server.get('/person/:input', ({method, params}, response) => {
	 const userInput = parseInt(params.input);
	 if (isNaN(userInput)) {
		  return response.status(500).jsonp({
				error: "Unable to parse int"
		  })
	 }
	 
	 if (userInput < 0 || userInput >= 10) {
		  return response.status(400).jsonp({
				error: "Value should be between 1 and 10"
		  })
	 }
	 
	 if (method === 'GET') {
		  response.status(200).jsonp({
				"val1": userInput,
				"val2": userInput * 2
		  });
	 }
});

// in val1
// out val 3 and val 4
server.get('/facility/:val1', ({method, params}, response) => {
	 const valueParam = parseInt(params.val1);
	 if (method === 'GET') {
		  response.status(200).jsonp({
				"val3": valueParam * 3,
				"val4": valueParam % 2 + 1
		  });
	 }
});


// in val2
// out val 5
server.get('/exposure/:val2', ({method, params}, response) => {
	 const valueParam = parseInt(params.val2);
	 if (method === 'GET') {
		  response.status(200).jsonp({
				"val5": valueParam - 1
		  });
	 }
});



server.listen(port, () => {
	 console.log('JSON Server is running')
});
