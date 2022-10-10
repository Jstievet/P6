
import express from "express";
// import multer from "../middleware/multer-config.js";
export const router = express.Router();
import Sauce from "../models/Sauce.js";
import sauceCtrl from "../controllers/sauce.js";
import auth from "../middleware/auth.js";


// const multer = require('../middleware/multer-config')



router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

export default routerSauce;