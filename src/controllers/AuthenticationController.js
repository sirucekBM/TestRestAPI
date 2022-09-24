const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { response } = require('express');

function jwtSignUser (user) {
    const ONE_HOUR = 60 * 60
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_HOUR,
        
    })
}

module.exports = {
    async register (req, res) {
        try {
            const user = await User.create(req.body);
            const userJson = user.toJSON()
            res.status(201).send({
                message: "Používateľ bol úspešne zaregistrovaný."
            })
        } catch (err) {
            console.log(res)
            res.status(400).send({
                error: 'Používateľské meno sa už používa, zvoľte iné prosím.'
            })
        }
    },
    async login (req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({
                where: {
                    username: username
                }
            })
            if (!user){
                return res.status(403).send({
                    error: "Nesprávne prihlasovacie údaje."
                })
            }

            const isPasswordValid = await user.comparePassword(password,user.password)
            if (!isPasswordValid){
                return res.status(403).send({
                    error: "Nesprávne prihlasovacie údaje."
                })
            }
            const userJson = user.toJSON()
            delete userJson.password
            res.cookie('token', jwtSignUser(userJson), {
                maxAge: 3600000,
                httpOnly: false,
                secure: false
            })
            res.send({
                id: response.id,
                user: userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: "Pri snahe príhlasiť sa nastala chyba. Skúste to neskôr prosím."
            })
        }
    },
    async logout (req, res) {
        res.clearCookie('token');
        res.status(200).send({message: 'Používateľ úspešne odhlásený!'})
    },
}