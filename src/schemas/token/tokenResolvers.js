const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../utils/utils');
const User = require('../../models/User');

const resolvers = {
    Mutation: {
        createToken: (_, {login, password}) => {
            return User.findOne({
                where: { login: login},
                attributes: ['id', 'password']
            }).then( (user) => {
                let errorMessage = 'Unauthorized, wrong login or password!';
                if(!user) throw new Error(errorMessage);
                if(!User.isPassword(user.get('password'), password)){
                    throw new Error(errorMessage);
                };

                const payload = { sub: user.get('id')};

                return {
                    token: jwt.sign(payload, JWT_SECRET(), { expiresIn: '24h' })
                }

            });
        }
    }
}

module.exports.resolvers = resolvers;