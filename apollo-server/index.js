import {ApolloServer} from "apollo-server";
import MockAPI from "./src/api";
import typeDefs from "./src/types";
import resolvers from "./src/resolvers";

const server = new ApolloServer({
	 typeDefs, resolvers, dataSources: () => {
		  return {
				mockAPI: new MockAPI()
		  };
	 }
})

server.listen().then(({url}) => {
	 console.log(`🚀  Server ready at ${url}`)
});