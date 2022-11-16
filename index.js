'use strict'
//IMPORTACIÓN DE LIBRERIAS
const express = require('express')

const bodyParser = require('body-parser')
const app = express()
//MANIPULACIÓN DE APP
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//RECOGER DATOS
app.get('/hola', (req, res) => {
    res.send({ message: 'Hola Mundo' })
})
app.get('/hola/:name', (req, res) => {
    var recojo = req.params.name;//body-parser es el que me está haciendo posible el params.name
    res.send({ message: `Hola Mundo ${recojo}!` })
})
app.get('/vuelos', (req, res) => {
    var vuelos = ['Barcelona', 'Madrid'];//body-parser es el que me está haciendo posible el params.name
    res.send({ message: `${vuelos}` })
})

app.post('/hola', (req, res) => {
    var names = ['Pere', 'carlos'];//body-parser es el que me está haciendo posible el params.name
    res.send({ message: `${names}` })

})
//el tipico post: el frontend envia JSON
//y lo recojo desde Node Expres
app.post('/flights', (req, res) => {
    console.log(req.body)//recoge json con muchos valores.
    var ciutat = req.body.ciutat; //recoger el valor/parametro llamado city
    var barri = req.body.Barri;
    var carrer = req.body.carrer;
    //instrucciones para poder manipular ciudad (LO QUE TU RECOGES Y LE ENVIAS)
    res.send({ message: `${ciutat} ${barri} ${carrer}` })


})
//creación objetos base datos
const mysql = require('mysql');
var connection = mysql.createConnection({

    host: 'localhost',
    database: 'testm06',
    user: 'root',
    password: ''
})

app.post('/api/login', function (req, res) {

    console.log("estem a login")
    //podríamos recoger valores
    //paso 1: Conectarnos
    connection.connect(function (err) {

        console.log(err);
        if (err) {
            console.log("Error connecting: " + err.stack)
            return

        }
        //si la connexion ha ido bien
        console.log('Connecte as id' + connection.threadId);

    })//CERRAMOS CONNECTION.CONNECT

    //PASO 2, SI ESTAMOS CONECTADOS SE HACE LA CONSULTA.
    connection.query('SELECT * FROM users', function (error, results, field) {
        //if para ver si hay algún error en la consulta
        if (error) {
            console.log('Error query' + error.stack)
            res.status(400).send({ resultats: null });

        } else {

            res.status(200).send({ resultats: results });
        }
    })//CERRAMOS LA CONNEXIÓN LOGIN
  
  //  connection.end();

})//CERRAMOS APP DE LOGIN


// app.post('/flights', (req, res) => {
//     console.log(req.body)
//     var ciutat = req.body.city; //recoger el valor/parametro llamado city
//     res.send({ message: `${ciutat}` })

// })



app.listen(3000, () => {
    console.log('Aquesta és la nostra API port 3000')
})