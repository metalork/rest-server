
// puerto

process.env.PORT = process.env.PORT || 3000;


// entorno

process.env.NODE_ENV= process.env.NODE_ENV || 'dev';

// vencimiento del token

process.env.CADUCIDAD_TOKEN = '48h';

process.env.SEED = process.env.SEED || 'este-es-el-seed-de-desarrollo'
// base de datos

let urlDB;

if (process.env.NODE_ENV === 'dev'){

    urlDB = 'mongodb://localhost:27017/cafe';
}else {
    urlDB = 'mongodb://cafeUser:123456abc@ds123171.mlab.com:23171/cafe'
}
process.env.URLDB = urlDB;

process.env.CLIENT_ID = process.env.CLIENT_ID || '470553242798-bk162uuud67uoj5ho5kofjejcli35vq2.apps.googleusercontent.com'


