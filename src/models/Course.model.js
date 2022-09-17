const { DataTypes } = require("sequelize");
const { sequilize } = require(".");

module.exports = (sequilize, DataTypes) => {
    const Course = sequilize.define('Course', {
        name:{
            type: DataTypes.STRING,
            unique: true
        },
        description: DataTypes.STRING,
        duration: DataTypes.STRING
    })

    return Course
}