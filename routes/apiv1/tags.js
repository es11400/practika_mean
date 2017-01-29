/**
 * Created by es11400 on 28/1/17.
 */

"use strict";

const express = require('express');
const router = express.Router();

const localConfig = require('./../../config');

const jwtauth = require('../../lib/jwtAuth');

router.use(jwtauth());

router.get('/', function (req, res) {

    res.json({success: true, tags: localConfig.tags });

});

module.exports = router;