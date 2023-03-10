
// imports
const express = require('express'); 
const router = express.Router(); 
const saucesControllers = require('../controllers/sauces'); 
const auth = require('../middleware/auth'); 
const multer = require('../middleware/multer-config');

//Importation de fichier like.js de controllers :
const likeControllers = require("../controllers/like")

// import des fonctions routes et ajout des middleware 
router.post('/', auth, multer, saucesControllers.createSauce); 
router.put('/:id', auth, multer, saucesControllers.modifySauce);
router.delete('/:id', auth, saucesControllers.deleteSauce);
router.get('/:id', auth, saucesControllers.getOneSauce);
router.get('/', auth, saucesControllers.getAllSauces);
router.post("/:id/like" , auth, likeControllers.likeSauce);

// export du router du fichier 
module.exports = router; 