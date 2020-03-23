const { hash, compareSync } = require('bcryptjs'); 
const { Model, DataTypes } = require('sequelize');

class User extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            login: DataTypes.STRING,
            password: DataTypes.STRING,
            photo: {
                type: DataTypes.BLOB,
                get() {
                    return this.getDataValue('photo') ? this.getDataValue('photo').toString('utf8') : null;
                }
            },
            //photo: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'users',
            hooks: {
                beforeCreate: async user => {
                    if(user.password){
                        user.password = await hash(user.password, 8)
                    }
                },
                beforeUpdate: async user => {
                    if(user.changed('password')){
                        user.password = await hash(user.password, 8)
                    }
                }
            }
        })
    }

    static associate(models) {
        // this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts'});

        this.belongsToMany(models.Profile, { 
            foreignKey: 'user_id', 
            through: 'users_profiles', as: 'profiles'
        });
        this.belongsToMany(models.System, { 
            foreignKey: 'user_id', 
            through: 'users_systems', as: 'systems'
        });

        

        // this.hasMany(models.System, { foreignKey: 'user_id', through: 'users_systems', as: 'user' });

        // this.hasMany(models.Profile, { 
        //     foreignKey: 'user_id',  as: 'profiles'
        // });
    }



    static isPassword(encodedPassword, password) {
        return compareSync(password, encodedPassword);
    }
}

module.exports = User;