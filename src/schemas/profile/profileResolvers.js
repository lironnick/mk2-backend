const { handleError, verifyToken, throwError } = require('../../utils/utils');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

const resolvers = {
    
    Query: {
        // PROFILES
        profiles: (_, {limit = 1, offset = 0}, context, info) => {

            const auth = verifyToken(context);

            return Profile.findAll({
                include: { association: 'users' },
                limit: limit,
                offset: offset,
            }).catch(handleError);
        },
        profile: (_, {id}, context) => {
            
            const auth = verifyToken(context);
        
            return Profile
                .findByPk(id)
                .then((profile) => {
                    throwError(!profile, `Profile with id ${id} not found!`);
                    return profile;
                }).catch(handleError);
        }
    },

    Mutation: {
        // PROFILE
        createProfile: async (_, {input}, context) => {

            const auth = verifyToken(context);

            const user = await User.findByPk(auth.id);
            if(!user) throwError(!user, `User not found!`);

            const [ profile, created ] = await Profile.findOrCreate({
                where: { name: input.name }
            }).catch(handleError);
            
            await user
                .addProfile(profile)
                .catch(handleError);

            return profile;

        },
        updateProfile: (_, {id, input}, context) => {

            const auth = verifyToken(context);
    
            return Profile
                .findByPk(id)
                .then((profile) => {
                    throwError(!profile, `Profile with id ${id} not found!`);
                    return profile.update(input);
                }).catch(handleError);
        },
        activeProfile: (_, {id, input}, context) => {

            const auth = verifyToken(context);
    
            return Profile
                .findByPk(id)
                .then((profile) => {
                    throwError(!profile, `Profile with id ${id} not found!`);
                    return profile.update(input);
                }).catch(handleError);
        },

        deleteProfile: async (_, {input}, context) => {
            const auth = verifyToken(context);

            return Profile.findByPk(input.id)
                .then((profile) => {
                    throwError(!profile, `Profile with id ${input.id} not found!`);
                    profile.destroy({
                        where: {input}
                    });
                    return true;
                }).catch(handleError);
        }
    }
}

module.exports.resolvers = resolvers;