import express from "express";
export const router = express.Router();
import { signUp, logIn } from "../controllers/user.controllers.js";
router.post("/signup", signUp);
router.post("/login", logIn);