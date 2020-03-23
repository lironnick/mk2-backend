const typeDef = `
  extend type Query {
    users(limit: Int!, offset: Int!): [User!]!
    user: User
    me: User
  }

  type User {
    id: ID!
    name: String!
    email: String
    login: String!
    photo: String
    active: Boolean
    profiles: [Profile!]!
    systems: [System!]!
}

input UserUpdateInput {
    name: String!
    email: String
    login: String!
    photo: String!
}

input UserUpdatePasswordInput {
    password: String!
}

extend type Mutation {
    createUser(name: String!, email: String, login: String!, password: String!): User
    updateUser(input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
}

`;

module.exports.typeDef = typeDef;