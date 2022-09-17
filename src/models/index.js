const fs = require('fs');
const path = require('path');
const Sequelize = require('sequilize');
const config = require('../config/config');
const db ={};

const sequilize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
);

fs
    .readdirSync(__dirname)
    .filter((file)=>
    file !== 'index.js'
    )   
    .forEach((file) => {
            const model = require(path.join(__dirname,file))
        (sequilize,Sequelize.DataTypes)
            db[model.name]= model
    })

    db.sequilize = sequilize
    db.Sequelize = Sequelize

module.exports = db;