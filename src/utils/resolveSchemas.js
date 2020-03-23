const schemas = require('require-all')(__dirname + '/../schemas');

// RESOLVE SCHEMAS
const schemasTypeDefs = [];
const schemasResolvers = new Object();

Object.entries(schemas).forEach(([keySchemas, valueSchemas]) => {
  Object.entries(valueSchemas).forEach(([keyDir, valueDir]) => {

    if (valueDir.typeDef)
      schemasTypeDefs.push(valueDir.typeDef);

    if (valueDir.resolvers) {

      Object.keys(valueDir.resolvers).forEach((key) => {
        if (!schemasResolvers[key])
          schemasResolvers[key] = new Object();

        Object.assign(schemasResolvers[key], valueDir.resolvers[key]);

      });
    }

    Object.entries(valueDir).forEach(([keySubDir, valueSubDir]) => {
      if (valueSubDir.typeDef)
        schemasTypeDefs.push(valueSubDir.typeDef);

      if (valueSubDir.resolvers) {

        Object.keys(valueSubDir.resolvers).forEach((key) => {
          if (!schemasResolvers[key])
            schemasResolvers[key] = new Object();

          Object.assign(schemasResolvers[key], valueSubDir.resolvers[key]);

        });
      }
    });
  });
});

module.exports.schemasTypeDefs = schemasTypeDefs;
module.exports.schemasResolvers = schemasResolvers;