const {getToken} = require('../Utils/GetToken');
const jwt = require('jsonwebtoken');
const config = require('../../config/app');
const User  =  require('../Models/User');

function decodeToken(){
    return async function(req, res, next){
        try{

            let token = getToken(req)

            if (!token){
                return next()
            }

            req.user = jwt.verify(token, config.secretKey);


            let user = await User.findOne({token: {$in: [token]}})

            if(!user){
                return res.json({
                    error: 1,
                    message: `Token expired`
                });
            }
        }catch (e) {
            if(e && e.name === 'JsonWebTokenError'){
                return res.json({
                    error: 1,
                    message: e.message
                });
            }
            next(e);
        }

        return next();
    }
}

module.exports = {
    decodeToken
}