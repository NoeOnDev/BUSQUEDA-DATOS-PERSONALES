import { sequelize } from '../database/database.config.js';
import { DataTypes, Model } from 'sequelize';

export class People extends Model {}

People.init({
    claveCliente: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    nombreContacto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telefonoContacto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    modelName: 'People',
    tableName: 'people',
    timestamps: false,
    underscored: true,
    freezeTableName: true,
});