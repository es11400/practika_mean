/**
 * Created by es11400 on 28/1/17.
 */

"use strict";

const express = require('express');
const router = express.Router();

const myErrors = require('./../../lib/myErrors');
const localConfig = require('./../../config');

const jwtauth = require('../../lib/jwtAuth');

router.use(jwtauth());

router.get('/', function (req, res, next) {

    res.json({success: true, tags: localConfig.tags });

});

module.exports = router;