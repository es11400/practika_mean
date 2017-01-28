/**
 * Created by es11400 on 21/1/17.
 */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, index: { unique: true }},
    password: String,
    salt : String
});

const User = mongoose.model('User', userSchema, 'User');
