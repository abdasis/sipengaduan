const mongoose = require('mongoose');
const {model, Schema} = mongoose;

const PengaduanSchema = Schema({
    nama: {
        type: String,
        minLength: [3, 'Nama minimal harus memiliki 3 karakter'],
        required: [true, 'Nama harus diisi']
    },

    telepon: {
        type: String,
        minLength: [3, 'Telepon harus memiliki 3 karakter'],
        maxLength: [13, 'Telepon hanya boleh berisikan 13 karakter'],
        required: [true, 'Nomor Telepon harus diisi']
    },

    isi_pengaduan: {
        type: String,
        required: [true, 'Isi pengaduan harus diisi']
    },

}, {
    timestamps: true
});

module.exports = model('Pengaduan', PengaduanSchema);