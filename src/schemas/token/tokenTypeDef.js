const typeDef = `
    type Token {
        token: String!
    }

    extend type Mutation {
        createToken(login: String!, password: String!): Token
    }    
`;

module.exports.typeDef = typeDef;