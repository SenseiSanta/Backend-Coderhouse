// Importaciones al servidor
const { request, response } = require('express');
const express = require('express');
const Contenedor = require('./src/Contenedor.js')

// Definiendo datos de servidor express
const app = express();
const PORT = 8080;

// Creando mi objeto contenedor
const caja = new Contenedor('./DB/products.json');


///////////////////////////////////////////////////////
    // Definiendo los ruteos de la pagina //
///////////////////////////////////////////////////////
    app.get('/', (request, response) => {
        response.send('<h1> Bienvenido a la pagina de contendor de productos </h1><p>Presione <a href="/productos">AQUI</a> para ir a ver productos</p>')
    })

    app.get('/productos', async (request, response) => {
        const products = await caja.getAll();

        response.send(products)
        /* for (let i = 0; i < products.length; i++) {
                let itemName = products[i].producto;
                let itemID = products[i].id;
                let itemPrice = products[i].precio;

                response.send(`<h3>Producto N°${itemID}: ${itemName} $${itemPrice}</h3>`)
        } */
    })

    app.get('/productoRandom', async (request, response) => {
        const products = await caja.getAll();
        const itemID = parseInt(Math.random()*3+1);
        const obj = products.find(element => element.id == itemID )

        response.send(obj)
    })

    app.get('*', (request, response) => {
        response.send('ERROR - 404 - Not Found')
    })
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto: ${PORT}`)
});