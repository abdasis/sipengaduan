function getToken(req) {
    let token = req.headers.authorization ? req.headers.authorization.replace('Bearer', '') : null;
    console.log(token);
    return token && token.length ? token : null;
}

module.exports = {
    getToken,
}