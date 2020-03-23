const graphqlFields = require('graphql-fields');
const { difference, union } = require('lodash');

class RequestedFields {
    
    getFields(info, options = 0) {
        let fields = Object.keys(graphqlFields(info));

        if (options == 0) { return fields; }

        fields = (options.keep) ? union(fields, options.keep) : fields;
        return (options.exclude) ? difference(fields, options.exclude) : fields;

    }
}


module.exports = RequestedFields;