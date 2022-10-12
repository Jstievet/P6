
import express from "express";
import { mult } from "../middleware/multer-config.js";
export const router = express.Router();
import Sauce from "../models/Sauce.js";
import { getAllSauces, createSauce, getOneSauce, modifySauce, deleteSauce } from "../controllers/sauce.js";
import auth from "../middleware/auth.js";

router.get('/', auth, getAllSauces);
router.post('/', auth, mult, createSauce);
router.get('/:id', auth, getOneSauce);
router.put('/:id', auth, modifySauce);
router.delete('/:id', auth, deleteSauce);
// router.post('/:id/like', auth, likeSauce);

export default router;