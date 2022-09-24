const jwt_decode = require('jwt-decode');

module.exports = {
    async validateLogin(req, res, next){
        const token = req.cookies.token;
        if(token){
            const decoded = jwt_decode(token);
            if(decoded.role == 'admin'){
                next();
            }
            else{
                res.status(403).send({ message: "Nedostatočné práva!" })
            }
        }
        if(!token){
            res.status(403).send({ message: "Neprihlásený používateľ!" })
        }
    }
};