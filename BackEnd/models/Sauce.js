// import de mongoose
const mongoose = require('mongoose'); 

// schéma de données contenant les champs pour chaque sauce
const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: false },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: Array, required: false },
    usersDisliked: { type: Array, required: false },
});

// export du schéma comme modèle Mongoose appelé « Sauce »
module.exports = mongoose.model('Sauce', sauceSchema);

