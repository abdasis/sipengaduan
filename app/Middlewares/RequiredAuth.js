const requiredAuth = (req, res, next) => {
    if (req.user)
    {
        next()
    }else{
        return res.json({
            code: 400,
            message: 'Silahkan login untuk mengakses halaman ini'
        })
    }
}

module.exports = requiredAuth;