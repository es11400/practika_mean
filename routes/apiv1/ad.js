/**
 * Created by es11400 on 25/1/17.
 */
"use strict";

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Ad = mongoose.model('Ad');
const myErrors = require('./../../lib/myErrors');

const jwtauth = require('../../lib/jwtAuth');

router.use(jwtauth());

router.get('/', function (req, res) {
    const name = req.query.name;
    const sale = req.query.sale;
    const tag = req.query.tag;
    const price = req.query.price;
    const limit = parseInt(req.query.limit);
    const start = parseInt(req.query.start);
    const fields = req.query.fields;
    const sort = req.query.sort;

    // Creamos un filtro vacio

    const filter = {};

    if(name) {
        filter.name = new RegExp('^' + name, "i");          // Para filtrar por que comience por "name" no case sensitive
        //filter.name = new RegExp('(' + name + ")", "i");  // Para filtrar por que contenga "name" no case sensitive
    }

    if (sale) {
        filter.sale = sale;
    }

    // Corregimos error al buscar si pertenece a mas de un TAG
    if (typeof tag === 'string') {
        filter.tags = tag;
    } else if (typeof tag === 'object') {
        var $all = tag;
        filter.tags = {$all};
    }

    if (price) {
        if (price.split('-').length == 1) {
            filter.price = price
        } else {
            if (parseInt(price.split('-')[0]) > 0 && parseInt(price.split('-')[1]) > 0 ){
                filter.price = {'$lte': price.split('-')[0], '$gte': price.split('-')[1]}
            }
            if (price.split('-')[0] === '' && parseInt(price.split('-')[1]) > 0 ){
                filter.price = {'$lte': price.split('-')[1]}
            }
            if (parseInt(price.split('-')[0]) > 0 && price.split('-')[1] === '' ){
                filter.price = {'$gte': price.split('-')[0]}
            }
        }
    }
    // Limitamos

    Ad.list(filter, limit, start, fields, sort, function (err, docs) {
        if (err) {
            return myErrors.CustomError(res, 'Error list', 430);
        }
        if (docs.length > 0 ) {
            res.json({success: true, data: docs});
        } else {
            return myErrors.CustomError(res, 'No data avaliable', 403)
        }

    })
});

module.exports = router;