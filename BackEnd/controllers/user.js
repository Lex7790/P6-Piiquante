//Importation du fichier User de models :
var User = require('../models/User');

//Importation de bcrypt pour hasher le password :
const bcrypt = require('bcryptjs');

//Importation de crypto-js pour chiffrer le mail :
const cryptojs = require('crypto-js');

//Importation de dotenv pour les variables d'environement :
const dotenv = require("dotenv").config();

//Importation de jsonwebtoken :
const jsonwebtoken = require('jsonwebtoken');



//Logique POST pour enregistrer un nouvel utilisateur (signup) :
exports.signup = (req, res, next) => {
    
    //chiffrer l'email dans la base de donnée :
    const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    console.log(emailCryptoJS)
    
    //hasher le mot de passe, salet 10x combien de fois sera exécuté l'algorithme de hashage :
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {

            //ce qui va être enregistré dans mongoDB :
            const user = new User({
                email: emailCryptoJS,
                password: hash,
            });

            //l'enregistrer dans la base de donnée :
            user.save()
                .then(() => res.status(201).json({message: "Utilisateur à bien était crée !"}))
                .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}));
};



//Logique pour controler la validité de l'utilisateur POST (login) :
exports.login = (req, res, next) => {

   //chiffrer l'email dans la base de donnée s'il existe :
   const emailCryptoJS = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
   
   User.findOne({email: emailCryptoJS})
        .then((user) => {
            if (!user){
                return res.status(401).json({message: "Paire identifiant/mot de passe incorrrect"})
            }

        //le user existe on utilise la méthode compare( ) de bcrypt pour comparer le mot de passe  envoyé par l'utilisateur,
        //avec le hash qui est enregistré avec le user dans la base de donnée :
        bcrypt.compare(req.body.password, user.password)  
            .then(valid => {
                if(!valid){
                  return res.status(401).json({ error: "mot de passe incorrect" });
                }
                else{
                    res.status(200).json({
                        userId: user._id,
                        token: jsonwebtoken.sign(
                            //user id :
                            {userId: user._id},
                            //la clé de chiffrement du token
                            `${process.env.JWT_KEY_TOKEN}`,
                            //le temps de validité du token
                            {expiresIn:'24h'}
                        )
                    })
                }
            })
            .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
}