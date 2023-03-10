//Importation de Express :
const express = require('express');

//Importation de morgan (logger http) :
const morgan = require("morgan");

//Importation conexion base de donnée mongoDB :
const mongoose = require('./mongoDB/db');

//Importation du path de notre serveur :
const path = require('path');

//Importation de helmet :
const helmet = require("helmet");


//Importation de fichier user.js de routes :
const userRoutes = require('./routes/user');

//Importation de fichier sauce.js de routes :
const sauceRoutes = require('./routes/sauces');




//Appel de Express pour crée une application :
const app = express();

//logger les requests et les responses :
app.use(morgan('dev'));




//CORS : 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});



//Utilisation de la fonction express.json() grâce à Express pour récupérer les requêtes et les afficher en format json :
app.use(express.json());

// utilisation du module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités :
app.use(helmet({crossOriginResourcePolicy: false,}));



//Routes :
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', sauceRoutes);



//Exportation du fichier app.js :
module.exports = app;

