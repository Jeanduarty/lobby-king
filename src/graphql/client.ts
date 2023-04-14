import { GraphQLClient } from "graphql-request"

const endpoint = `${process.env.NEXT_PUBLIC_GRAPHQL_HOST}
${process.env.NEXT_PUBLIC_GRAPHQL_TOKEN}` || "";

const client = new GraphQLClient(endpoint)

export default client