'use scrict'

const http = require('http');
const router = require('./router/router');
const host ='127.0.0.1';
const puerto = '3000';

// La línea de abajo es la forma sencilla,
// http.createServer(router).listen(puerto);

http.createServer(router).listen(puerto, host, () => {
    console.log('La presente app corre en: ' + host + ":" + puerto);
});

//El nombre 'index.DP.js' quiere decir: "Index design patters"
