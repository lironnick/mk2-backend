const { Model, DataTypes } = require('sequelize');

class System extends Model {

    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            active: DataTypes.BOOLEAN,
        }, {
            sequelize,
            tableName: 'systems',
        })
    }

    static associate(models) {
        this.belongsToMany(models.User, { 
            foreignKey: 'system_id', 
            through: 'users_systems', as: 'users' 
        });
    }

    // static associate(models) {
    //     // this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts'});
    //     this.belongsTo(models.User, { foreignKey: 'user_id', through: 'users_systems', as: 'user' });
    // }
}

module.exports = System;