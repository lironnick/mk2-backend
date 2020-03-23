const { handleError, verifyToken, throwError } = require('../../utils/utils');
const User = require('../../models/User');
const System = require('../../models/System');

const resolvers = {
    Query: {
        // SYSTEMS
        systems: async (_, {limit = 10, offset = 0}, context) => {

            const auth = verifyToken(context);

            const user = await User.findByPk(auth.id, {
                include: { 
                    association: 'systems',
                    through: { 
                        attributes: ['name']
                    } 
                },
                limit: limit,
                offset: offset
            });

            return user.systems;
        },
        system: (_, {id}, context) => {
            
            const auth = verifyToken(context);
            
            return System
                .findByPk(id, {
                    include: { association: 'users'},
                })
                .then((system) => {
                    throwError(!system, `System with id ${id} not found!`);
                    return system;
                }).catch(handleError);
        }
    },

    Mutation: {
        // SYSTEM
        createSystem: async (_, {input}, context) => {

            const auth = verifyToken(context);

            const user = await User.findByPk(auth.id);
            if(!user) throwError(!user, `User not found!`);

            const [ system, created ] = await System.findOrCreate({
                where: { name: input.name }
            });

            await user.addSystem(system);

            return system;
        },
        updateSystem: (_, {id, input}, context) => {

            const auth = verifyToken(context);
    
            return System
                .findByPk(id)
                .then((system) => {
                    throwError(!system, `System with id ${id} not found!`);
                    return system.update(input);
                }).catch(handleError);
        },
        activeSystem: (_, {id, input}, context) => {

            const auth = verifyToken(context);
    
            return System
                .findByPk(id)
                .then((system) => {
                    throwError(!system, `Profile with id ${id} not found!`);
                    return system.update(input);
                }).catch(handleError);
        },
        deleteSystem: async (_, {input}, context) => {

            const auth = verifyToken(context);

            const user = await User.findByPk(auth.id);

            if(!user) throwError(!user, `User not found!`);

            const system = await System.findByPk(input.id);

            return await user.removeSystem(system);
        }
    }
}

module.exports.resolvers = resolvers;