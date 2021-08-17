const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const bcrypt = require('bcrypt');
const HASH_ROUND = 10;

let userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Nama harus diisi']
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Email harus diisi']
    },
    role: {
        type: String,
    },
    token: [String]
}, {timestamps: true});

userSchema.path('email').validate(function (value){
    const EMAIL_RE = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return EMAIL_RE.test(value);
}, attr => `${attr.value} tidak valid`);

userSchema.path('email').validate(async function (value){
    try{
        const count = await this.model('User').count({email: value});
        return !count;
    }catch (e) {
        throw e;
    }
}, attr => `${attr.value} sudah terdaftar`);

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND);
    next()
})

module.exports = model('User', userSchema);
