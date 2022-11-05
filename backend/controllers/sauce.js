import Sauce from '../models/Sauce.js';
import fs from 'fs';
export const createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
        .then(() => { res.status(201).json({ message: 'sauce enregistré !' }) })
        .catch(error => { res.status(400).json({ error }) })
};

export const modifySauce = (req, res, next) => {


    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            const sauceObject = req.file ? {
                // on récupère l'adresse de l'image
                ...JSON.parse(req.body.sauce),
                imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            } : { ...req.body };
            if (req.file != null) {
                Sauce.findOne({ _id: req.params.id }) // on identifie la sauce
                    .then(sauce => {
                        const filename = sauce.imageUrl.split('/images/')[1]; // on récupère l'adresse de l'image
                        //suppression de l'image dans le dossier images du serveur
                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) throw error;
                        })
                    })
                    .catch(error => res.status(400).json({ error }));
            }
            // delete sauceObject._userId;
            Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                .then(() => res.status(200).json({ message: 'sauce modifié !' }))
                .catch(error => res.status(400).json({ error }));



        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

export const deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }) // on identifie la sauce
        .then(sauce => {
            const filename = sauce.imageUrl.split('/images/')[1]; // on récupère l'adresse de l'image
            fs.unlink(`images/${filename}`, () => { /// on la supprime du serveur
                Sauce.deleteOne({ _id: req.params.id }) // on supprime la sauce de la bdd
                    .then(() => res.status(200).json({ message: 'Sauce supprimée' }))
                    .catch(error => res.status(400).json({ error }))
            });
        })
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

