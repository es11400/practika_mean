/**
 * Created by es11400 on 26/1/17.
 */
"use strict";

const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const localConfig = require('../../config');

const mongoose = require('mongoose');
const User = mongoose.model('User');

const validator = require('validator');

const myErrors = require('./../../lib/myErrors');

var pwdHash = require('s-salt-pepper');


pwdHash.configure({
    pepper: localConfig.jwt.secret
});


router.post('/signup', function (req, res) {
    // Obtenemos los datos de registro
    const userName = req.body.username || "";
    const email = req.body.email || "";
    const password = req.body.password || "";
    var errorText;

    if ( validator.isEmpty(userName)){
        errorText = 'User is empty'
    }
    if ( validator.isEmpty(email)){
        errorText = 'Email is empty'
    } else if ( !validator.isEmail(email)){
        errorText = 'Insert correct email'
    }

    if ( validator.isEmpty(password)){
        errorText = 'Password is empty'
    }
    if ( !validator.isLength(password,{min:8, max: undefined})){
        errorText = 'Password is too short, 8 characters minimun'
    }

    if (errorText) {
        return myErrors.CustomError(res, errorText, 400);

    }

    pwdHash.hash(password,function (err, salt, hash) {
        if (err) {
            return myErrors.CustomError(res, err.message, err.statusCode);
        }
        const user = new User({name: userName, email: email, password: hash, salt: salt});

        //Comprobamos que el usuario es correcto.
        try {
            user.validateSync();
        }catch (err) {
            return myErrors.CustomError(res, err.message, err.statusCode);
        }

        user.save(function (err, newUser) {
            if (err) {
                console.log(err);
                return myErrors.CustomError(res, 'MongoBD : Internal server error', 500);
            }
            const token = jwt.sign({_id: newUser._id}, localConfig.jwt.secret, {expiresIn: localConfig.jwt.expiresIn});

            res.json({success: true, token: token});

        });
    });



});

router.post('/authenticate', function (req, res) {

    const email = req.body.email || "";
    const password = req.body.password || "";
    let errorText;
    if ( validator.isEmpty(password)){
        errorText = 'Password is empty'
    } else if ( !validator.isLength(password,{min:8, max: undefined})){
        errorText = 'Password is too short, 8 characters minimun'
    }
    if ( validator.isEmpty(email)){
        errorText = 'Email is empty'
    } else if ( !validator.isEmail(email)){
        errorText = 'Insert correct email'
    }
    if (errorText) {
        return myErrors.CustomError(res, errorText, 400);

    }
    User.findOne({email: email }, function (err, userFind) {
       if (err){
           return myErrors.CustomError(res, err.message, err.statusCode);
       }
       pwdHash.compare(password, userFind.salt, function (err, hash) {
           if (err){
               return myErrors.CustomError(res, err.message, err.statusCode);
           }
           if (userFind.password === hash){
               const token = jwt.sign({ _id: userFind._id }, localConfig.jwt.secret, { expiresIn: localConfig.jwt.expiresIn});
               res.json({success: true, token: token});
           } else {
               return myErrors.CustomError(res, 'Password or email is incorrect', 500);
           }
       })
    });
});




module.exports = router;