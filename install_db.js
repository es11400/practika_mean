/**
 * Created by es11400 on 21/1/17.
 */
"use strict";

const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const config = require('./config');
var image_downloader = require('image-downloader');

// Promesa que borra la base de datos nodepop
function dropDb(db) {
    return new Promise(function (resolve, reject) {
        db.dropDatabase(function (err) {
            if (err) {
                return reject('Error al eliniminar la Base de datos => '+ err);
            }
            resolve('Base de datos ' + db + ' eliminada');
        });
    });
}
// Promesa que descarga la imagen con image-downloader
function downImage(img) {
    return new Promise(function (resolve, reject) {
        //console.log(img);
        let imgName = img.substr(0, img.indexOf('?')).replace('https://images.unsplash.com/','');
        imgName = './public/images/' + imgName + '.jpg'
        var options = {
            url: img,
            dest: imgName,                  // Save to /path/to/dest/image.jpg
            done: function(err, filename, image) {
                if (err) {
                    //throw err;
                    return reject('Error: ' + err);
                }
                console.log('File saved to', filename);
            },
        };
        image_downloader(options);
        return resolve(imgName.replace('./public',''));
    });
}

// Promesa de devuelve una direccion de una foto del API de UnSplash
function getUnsplashImage(photoOptions) {
    return new Promise(function (resolve, reject) {
        request(photoOptions, function (err, resp, body) {
            if (err) {
                return reject('Error: ' + resp.statusCode + ' ' + err);
            }
            if (resp.statusCode >= 400) {
                return resolve('no_image.png');
            } else {
                return resolve(JSON.parse(body).urls.small);
            }

        })
    });
}
// Promesa que inserta en la DB los datos e imagenes descargads en ./public/images/
function insertAd(db, photoOptions) {
    return new Promise(function (resolve, reject) {

        for (let i=0; i < config.numberOfAds; i++) {

            getUnsplashImage(photoOptions)
                .then(function (img) {
                    if (img === 'no_image.png') {
                        return img;
                    } else {
                        return downImage(img);
                    }
                })
                .then(function (img) {
                    const ad = {
                        name: config.adSamples.names[Math.floor(Math.random() * 20)],
                        sale: config.adSamples.sales[Math.floor(Math.random() * 2)],
                        price: (Math.random() * (config.maxprice - config.minprice) + config.minprice).toFixed(2),
                        photo: img,
                        tags: [config.adSamples.tags[Math.floor(Math.random() * 4)]]
                    };
                    db.collection('Ad').insert(ad,function (err) {
                        if (err) {
                            return reject('Error al insertar Ad la Base de datos => '+ err);
                        }

                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
        }

        return resolve('All images are inserted on nodepop database');
    });
}
// Promesa casi inutil que inserta dos usuarios de ejemplo en nodepop
function insertUser(db) {
    return new Promise(function (resolve, reject) {

        db.collection('User').insert(config.userSample, function (err) {
            if (err) {
                return reject('Error al insertar User la Base de datos => '+ err);
            }
        });

        return resolve('All User are inserted on nodepop database');
    });
}

// Conectamos con MongoDb
MongoClient.connect('mongodb://localhost:27017/nodepop', function (err, db) {
    if (err) {
        return console.log('Error : ' + err);
    }
    dropDb(db)
        .then(function () {
            return console.log(insertAd(db,config.photoOptions));
        })
        .then(function () {
            return console.log(insertUser(db));
        })
        .catch(function (err) {
            console.log(new Error('Ocurrió un error: ' + err));
        });
});