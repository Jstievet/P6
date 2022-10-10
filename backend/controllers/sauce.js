// const Sauce = require('../models/Sauce');
import Sauce from '../models/Sauce.js';
export const createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete req.body.id;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log('sauce', sauce);

    sauce.save()
        .then(() => { res.status(201).json({ message: 'sauce enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

export const modifySauce = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce modifié !' }))
        .catch(error => res.status(400).json({ error }));
}

export const deleteSauce = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'sauce supprimé !' }))
        .catch(error => res.status(400).json({ error }));
}

export const getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
}

export const getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error }));
}
export default Sauce;
// export const likeSauce = (req, res ,next) => {
    
// }