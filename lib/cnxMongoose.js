/**
 * Created by es11400 on 21/1/17.
 */
"use strict";

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;
conn.on('error', function (err) {
    return console.log(myErrors('Error al conectar', 500, err));
    process.exit(1);
});

conn.once('open', function () {
    return console.log('Connected to MongoDb');
});

mongoose.connect('mongodb://localhost:27017/nodepop');