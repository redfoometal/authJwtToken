import { Sequelize, DataTypes } from "sequelize";

const {DATABASE_NAME, DATABASE_USER, DATABASE_PASS} = process.env;
const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USER, DATABASE_PASS,{
    dialect: 'mysql'
})

export const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
})