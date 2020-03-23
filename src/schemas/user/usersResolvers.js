const { handleError, verifyToken, throwError } = require('../../utils/utils');
const User = require('../../models/User');

const resolvers = {
    Query: {
        users: (_, { limit = 1, offset = 0 }, context) => {

            const auth = verifyToken(context);

            return User.findAll({
                include: [
                    {
                        association: 'systems',
                        required: false,
                    },
                    {
                        association: 'profiles',
                        required: false,
                    },

                ],
                limit: limit,
                offset: offset
            }).catch(handleError);
        },
        user: (_, args, context) => {

            const auth = verifyToken(context);

            return User
                .findByPk(auth.id)
                .then((user) => {
                    throwError(!user, `User with id ${auth.id} not found!`);
                    return user;
                }).catch(handleError);
        },
        me: (_, args, context) => {

            const auth = verifyToken(context);

            return User
                .findByPk(auth.id)
                .then((user) => {
                    throwError(!user, `User with id ${auth.id} not found!`);
                    return user;
                }).catch(handleError);
        }
    },

    Mutation: {
         // USER
         createUser: (_, {name, email, login, password}) => {
            return User.create({name, email, login, password})
            .then((user) => {
                if(!user) throw new Error(`User with ${name} not found!`);
                return user;
            }).catch(handleError);
        },
        updateUser: (_, {input}, context) => {

            const auth = verifyToken(context);
    
            return User
                .findByPk(auth.id)
                .then((user) => {
                    throwError(!user, `User with id ${auth.id} not found!`);
                    return user.update(input);
                }).catch(handleError);
        },
        updateUserPassword: (_, {input}, context) => {

            const auth = verifyToken(context);
    
            return User
                .findByPk(auth.id)
                .then((user) => {
                    console.log(user);
                    throwError(!user, `User with id ${auth.id} not found!`);
                    return user
                        .update(input)
                        .then((user) => !!user);
                }).catch(handleError);
        }
    }
}

module.exports.resolvers = resolvers;