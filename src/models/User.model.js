const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function hashPassword (user, options) {
    const SALT_FACTOR = 8

    if(!user.changed('password')){
        return;
    }

    return bcrypt
        .genSaltAsync(SALT_FACTOR)
        .then(salt => bcrypt.hashAsync(user.password, salt, null))
        .then(hash => {
            user.setDataValue('password', hash)
        })
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, 
    {
        hooks: {
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    }
    )

    User.prototype.comparePassword = function(password,savedPassword){
        return bcrypt.compareAsync(password, savedPassword)
    }

    return User;
}