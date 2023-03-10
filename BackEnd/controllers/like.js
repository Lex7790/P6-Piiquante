//imporation modèle de la base de donnée :
const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => { 
    switch (req.body.like) { 

        // Dislike
        case -1: 
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: 1 } }) 
            .then(() => res.status(200).json({ message: "Je n'aime pas cette sauce !" }))
            .catch(error => res.status(400).json({ error }));
        break; 
        
        // Like
        case 1:
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: req.body.userId }, $inc: { likes: 1 } })
            .then(() => res.status(200).json({ message: "J'aime cette sauce ! " }))
            .catch(error => res.status(400).json({ error }));
        break;
        
        //Unlike/undislike
        case 0:
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
            if (sauce.usersDisliked.find(user => user === req.body.userId)) { 
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
                .then(() => res.status(201).json({ message: 'Modification effectuée !' }))
                .catch(error => res.status(400).json({ error }));
            }
            if (sauce.usersLiked.find(user => user === req.body.userId)) {
                Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
                    .then(() => res.status(201).json({ message: 'Modification effectuée !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(400).json({ error }));
        break;

        default:
        console.error("Il y a eu un problème lors de votre requête, veillez réessayer");
        break;
    }
}