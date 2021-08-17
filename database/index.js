const mongoose = require('mongoose');

const {dbHost, dbName, dbPort, dbUser, dbPass} = require('../config/app');

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`,
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true});

const db = mongoose.connection;

module.exports = db;