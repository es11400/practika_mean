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
            return myErrors.CustomError(res, 'No token provided', 500);
        }
        jwt.verify(token, localConfig.jwt.secret, function (err, decoded) {
            if (err){
                return myErrors.CustomError(res, 'Invalid token', 500);
            }
            req.decoded = decoded;
            next();
        });
    };
};