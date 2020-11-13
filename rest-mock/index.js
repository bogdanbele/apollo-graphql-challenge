import jsonServer from 'json-server';

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = 3000

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.get('/facility/:val1', (request, response) => {

})

server.get('/exposure/:val2', (request, response) => {

})

server.get('/person/:input', ({method, params}, response) => {
	 const userInput = parseInt(params.input);
	 if (isNaN(userInput)) {
		  return response.status(500).jsonp({
				error: "Unable to parse int"
		  })
	 }
	 
	 if (userInput < 0 || userInput >= 10) {
		  return response.status(500).jsonp({
				error: "Value should be between 1 and 10"
		  })
	 }
	 
	 if (method === 'GET') {
		  response.status(200).jsonp({
				"val1": userInput,
				"val2": request.params.input * 2
		  });
	 }
});


server.listen(port, () => {
	 console.log('JSON Server is running')
})
