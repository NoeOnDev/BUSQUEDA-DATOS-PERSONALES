import { sequelize } from '../database/database.config.js';
import { DataTypes, Model } from 'sequelize';
import bcrypt from 'bcrypt';

export class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
    underscored: true,
    freezeTableName: true,
    hooks: {
        beforeCreate: async (user) => {
            const saltRounds = 10;
            const hash = await bcrypt.hash(user.password, saltRounds);
            user.password = hash;
        }
    }
});