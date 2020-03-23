const _ = require('lodash');

/**
 * @description Função de lote genérica.
 * @param {Object} params {key: int, model: Model, column: string, info: GraphQLResolveInfo, exclude: [string]}
 * @param {RequestedFields} requestedFields
 * @author Camilla Fernandes
 */
const batchModels = async (params, requestedFields) => {

    let ids = params.map(param => param.key);
    ids = ids.filter((elem, i) => ids.indexOf(elem) === i);
    
    const model = params[0].model;
    const column = params[0].column;
    
    const result = await model.findAll({
  
      where: { [column]: ids },
      attributes: requestedFields.getFields(params[0].info, {keep: [column], exclude: params[0].exclude ? params[0].exclude : []}),
    
    });
    
    const gs = _.groupBy(result, column);
  
    return params.map(k => gs[k.key] || []);    
  
  }

  module.exports = batchModels;