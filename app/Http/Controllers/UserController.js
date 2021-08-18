const User = require('../../Models/User')
async function register(req, res, next) {
    try{
        const payload = req.body;

        let user = new User(payload);
        await user.save();

        return res.json({
            code: 200,
            status: 'success',
            message: 'Register berhasil',
            data: user
        })
    }catch (e) {
        if(e && e.name === 'ValidationError'){
            return res.json({
                error: 1,
                message: e.message,
                fields: e.errors
            });
        }

        next(e);

    }
}



module.exports = {
    register,
}