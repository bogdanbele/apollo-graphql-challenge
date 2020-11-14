import { gql } from "apollo-server"

const typeDefs = gql`
    type UserResponse {
        val3: Int!
        val5: Int!
    }
    type Query {
        exposure(input: Int!): UserResponse!
    }
`;

export default typeDefs