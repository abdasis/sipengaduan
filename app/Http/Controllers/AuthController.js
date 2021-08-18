const User = require('../../Models/User');
const bcrypt = require('bcrypt');
const passport  = require('passport');
const jwt = require('jsonwebtoken');
const config  =  require('../../../config/app')
const {getToken} = require('../../Utils/GetToken');

async function login(req, res, next) {
    passport.authenticate('local', async function (e, user){
        if (e){
            return next(e)
        }

        if (!user){
            return res.json({
                code: 400,
                message: 'email incorrect'
            })
        }

        let signed = jwt.sign(user, config.secretKey);

        await User.findOneAndUpdate({_id: user._id}, {$push: {token: signed}}, {new: true})

        return res.json({
            message: 'logged in successfully',
            user: user,
            token: signed
        })
    })(req, res, next);

}

async function logout(req, res, next) {
    let token = getToken(req);

    let user = await User.findOneAndUpdate({token: {$in: [token]}}, {$pull: {token}}, {useFindAndModify: false})

    if (!user || !token){
        return res.json({
            error: 1,
            message: 'User tidak ditemukan'
        })
    }

    return res.json({
        error: 0,
        message: 'Logout berhasil'
    })

}

async function localStrategy(email, password, done) {
    try{
        let user = await User.findOne({email}).select('-__v -updatedAt -createdAt -token');

        if (!user){
            return done;
        }

        if (bcrypt.compareSync(password, user.password))
        {
            ({password, ...userWithoutPassword} = user.toJSON());

            return done(null, userWithoutPassword)
        }
    }catch (e) {
        done(e, null);
    }
}

function me(req, res, next){
    if(!req.user){
        return res.json({
            error: 1,
            message: `Your're not login or token expired`
        });
    }
    return res.json(req.user);
}

module.exports = {
    login,
    logout,
    localStrategy,
    me,
}