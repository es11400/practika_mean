/**
 * Created by es11400 on 21/1/17.
 */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const adSchema =  new Schema({
    name: { type: String, index: true },
    sale: Boolean,
    price: Number,
    photo: String,
    tags: { type: [String], index: true }
});

// ponemos un metodo al schema
adSchema.statics.list = function (filter, limit, start, fields, sort, cb) {
    console.log(filter);
    const query = Ad.find(filter);
    query.limit(limit);
    query.skip(start);
    query.select(fields);
    query.sort(sort);
    query.exec(cb);
};

const Ad = mongoose.model('Ad', adSchema, 'Ad');