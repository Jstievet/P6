import express from 'express';
import mongoose from 'mongoose';
import { router as userRoutes } from './routes/user.route.js';
import { router as sauce } from './routes/sauce.js';


export const app = express();

//conection to MongodB !!!!!!!!!!!! mot de passe en .env avec librairie .env
mongoose.connect('mongodb+srv://cranien:azerty01@cluster0.eeigvqh.mongodb.net/test',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/sauces", sauce);
