const express = require("express");
const mongoose = require("mongoose");
// import mongoose from "mongoose"
const userRoutes = require("./routes/user");
// import { router as userRoutes } from "./routes/user";
// const Sauce = require('./models/Sauce');

mongoose.connect('mongodb+srv://cranien:azerty01@cluster0.eeigvqh.mongodb.net/test',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json);
app.use("/api/auth", userRoutes);
app.use("/", () => {
    console.log('test');
})
module.exports = app;