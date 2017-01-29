/**
 * Created by es11400 on 25/1/17.
 */
"use strict";

const jwt = require('jsonwebtoken');
const localConfig = require('../config');
const myErrors = require('./myErrors');

//Middleware de autenticación
module.exports = function () {
    return function (req, res, next) {
        const token = req.body.token || req.query.token || req.get('x-access-token');
        if (!token) {
            return next(new myErrors(__('No token provided'), 500) ); //eslint-disable-line no-undef
        }
        jwt.verify(token, localConfig.jwt.secret, function (err, decoded) {
            if (err){
                return next(new myErrors(__('Invalid token'), err.statusCode, err)); //eslint-disable-line no-undef
            }
            req.decoded = decoded;
            next();
        });
    };
};