const _ = require('lodash');
const BranchAddress = require('../../models/BranchAddress');

const batchBranchAddress = async (params, requestedFields) => {

    let ids = params.map(param => param.key);
    ids = ids.filter((elem, i) => ids.indexOf(elem) === i);
    
    const result = await BranchAddress.findAll({
  
      where: { id: ids },
      attributes: requestedFields.getFields(params[0].info, {keep: ['id']})
    
    });
  
    const gs = _.groupBy(result, 'id');
  
    return params.map(k => gs[k.key] || []);
  
  }

  module.exports = batchBranchAddress;