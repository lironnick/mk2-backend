const typeDef = `
  extend type Query {
    profiles(limit: Int!, offset: Int!): [Profile!]! 
    profile(id: ID!): Profile
  }

  type Profile {
    id: ID!
    name: String!
    description: String
    active: Boolean
    users: [User!]!
}

input ProfileCreateInput {
    name: String!
    description: String
    active: Boolean
}

input ProfileUpdateInput {
    name: String!
    description: String
    active: Boolean
}

input ProfileActiveInput {
    active: Boolean!
}

input ProfileDeleteInput {
    id: ID!
}

extend type Mutation {
    createProfile(input: ProfileCreateInput!): Profile
    updateProfile(id: ID!, input: ProfileUpdateInput!): Profile
    activeProfile(id: ID!, input: ProfileActiveInput!): Profile
    deleteProfile(input: ProfileDeleteInput!): Boolean
}
`;

module.exports.typeDef = typeDef;