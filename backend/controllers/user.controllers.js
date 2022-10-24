import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: "Nouveau utilisateur créé" }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

export const logIn = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                console.log('test user');
                res.status(401).json({ message: "Paire identifiant / Mot de passe incorrecte" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        console.log('test user mdp');
                        res.status(401).json({ message: "Paire identifiant / Mot de passe incorrecte" })
                    }
                    console.log('req', req.body);
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_KEY,
                            { expiresIn: "24h" }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}