const typeDef = `
  extend type Query {
    systems(limit: Int!, offset: Int!): [System!]! 
    system(id: ID!): System
  }

  type System {
    id: ID!
    name: String!
    description: String
    active: Boolean
    users: [User!]!
}

input SystemCreateInput {
    name: String!
    description: String
    active: Boolean
}

input SystemUpdateInput {
    name: String!
    description: String
    active: Boolean
}

input SystemDeleteInput {
    id: ID!
}

input SystemActiveInput {
    active: Boolean!
}

extend type Mutation {
    createSystem(input: SystemCreateInput!): System
    updateSystem(id: ID!, input: SystemUpdateInput!): System
    activeSystem(id: ID!, input: SystemActiveInput!): System
    deleteSystem(id: ID!, input: SystemDeleteInput!): Boolean
}
`;

module.exports.typeDef = typeDef;