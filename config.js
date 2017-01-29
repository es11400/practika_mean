/**
 * Created by es11400 on 25/1/17.
 */
"use strict";

module.exports = {
    tags: ['work', 'lifestyle', 'motor', 'mobile'],     //TAGS Disponibles
    numberOfAds: 25,// El máximo de imágenes a descargar del API de UnSplash es de 50, si numberOfAds es mayor el resto de imágenes seran no_image.png
    minprice: 1,    // minimo precio para ejemplos
    maxprice: 1000.00,  // máximo precio para ejemplos
    adSamples: {
        names: ['Bike', 'TriBike ;)', 'Snowboard table', 'Surf table', 'Rollers',
            'Xiaomi miPad', 'iPad 3', 'iPhone 6', 'BlackBerry Bold', 'Motorola V',
            'Ducatti', 'Ferrari 360', 'BMW GS1200', 'Vespa 125cc', 'Mercedes 320',
            'Astrologer', 'Astronaut', 'Developer', 'Designer', 'Policeman'],
        sales: [true, false]
    },
    // Extraemos de la api de unplash imagenes de ejemplo.
    // ESTA LIMITADA A 50 PETICIONES POR HORA, si no se puede descarga se asigna al anuncio no_image.png que esta en ./public/images/
    photoOptions: {
        url: 'https://api.unsplash.com/photos/random',
        w: 220,
        h: 320,
        orientation: 'portrait',
        query: 'cars',
        headers: {
            'Authorization': 'Client-ID 4fd7b5179daf3a9da11774bb8726ff58e579f39e2627f7ad6f2d86bb192093da'
        }
    },
    userSample: {
        name: 'Carlos Castaño', email: '11400.es@gmail.com', password:'123123'
    },
    jwt: {
        secret: 'DesdeSanturce&Bilbado',
        expiresIn: '2 days'
    },
    languages: ['en', 'es']
}