const { Model, DataTypes } = require('sequelize');

class Profile extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'profiles',
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, { 
            foreignKey: 'profile_id', 
            through: 'users_profiles', as: 'users' 
        });
    }

    // static associate(models) {
    //     this.belongsTo(models.User, { 
    //         foreignKey: 'user_id', as: 'users' 
    //     });
    // }

    
}

module.exports = Profile;