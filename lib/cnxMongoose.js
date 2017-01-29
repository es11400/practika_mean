/**
 * Created by es11400 on 21/1/17.
 */
"use strict";
const debug = require('debug')('nodepop:lib:cnxMongoose');
const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;
conn.on('error', function (err) {
    debug('Error al conectar'+ err);
});

conn.once('open', function () {
    console.log('Connected to MongoDb');
});

mongoose.connect('mongodb://localhost:27017/nodepop');