const DataLoader = require('dataloader');
const RequestedFields = require('../ast/RequestedFields');
const batchModels = require('./batchModels');
// const batches = require('require-all')(__dirname + '/batchModels');

const requestedFields = new RequestedFields();

/**
 * @description Função que agrupa os loaders quer serão eviados para os resolvers pelo contexto.
 * @author Camilla Fernandes
 */
const getLoaders = () => {
    return {
        branchLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),
        branchAddressLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        branchEmailLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        branchPhoneLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        branchImagesLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        branchSchedulesLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        clientLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        clientAddressLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        clientPhoneLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        userLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        salesAreaLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        tagLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        productLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        productImageLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

        priceCampaingsLoader: new DataLoader(
            (params) => batchModels(params, requestedFields), 
            { cacheKeyFn: (param) => param.key }        
        ),

    }
}

module.exports = getLoaders;