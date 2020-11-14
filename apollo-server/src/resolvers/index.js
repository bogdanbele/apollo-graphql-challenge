const resolvers = {
	 Query: {
		  exposure: async (parent, {input}, {dataSources}) => {
				// Step 1
				const {val1, val2} = await dataSources.mockAPI.fetchPerson(input)
				
				// Step 2
				const {val3, val4} = await dataSources.mockAPI.fetchFacility(val1)
				
				// Step 3
				const {val5} = await dataSources.mockAPI.fetchExposure(val2)
				
				return {val3, val5}
		  }
	 }
}

export default resolvers;