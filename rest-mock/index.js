import jsonServer from 'json-server';

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.get('/person/:input', (request, response) => {
	 console.log('here')
	 const {method, params} = request;
	 const userInput = parseInt(params.input);
	 if (isNaN(userInput)) {
		  return response.status(500).jsonp({
				error: "Unable to parse int"
		  })
	 }
	 
	 console.log(userInput)
	 
	 if (userInput < 0 || userInput >= 10) {
		  return response.status(500).jsonp({
				error: "Value should be between 1 and 10"
		  })
	 }
	 
	 
	 if (method === 'GET') {
		  
		  console.log('inside GET')
		  console.log(typeof userInput)
		  
		  
		  response.status(200).jsonp({
				"val1": userInput,
				"val2": request.params.input * 2
		  });
	 }
});


server.listen(port, () => {
	 console.log('JSON Server is running')
})
