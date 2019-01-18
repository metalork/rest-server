
// puerto

process.env.PORT = process.env.PORT || 3000;


// entorno

process.env.NODE_ENV= process.env.NODE_ENV || 'dev';

// vencimiento del token

process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'
// base de datos

let urlDB;

if (process.env.NODE_ENV === 'dev'){

    urlDB = 'mongodb://localhost:27017/cafe';
}else {
    urlDB = 'mongodb://cafeUser:123456abc@ds123171.mlab.com:23171/cafe'
}
process.env.URLDB = urlDB;


