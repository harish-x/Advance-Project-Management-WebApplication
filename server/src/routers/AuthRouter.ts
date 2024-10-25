import express from "express";
import { getAccessToken, logout, register } from "../controllers/AuthController";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";

const router = express.Router()

router.route('/register').post(register)
router.route('/refresh').get(isAuthenticatedUser, getAccessToken)
router.route('/logout').post(logout)



export default router;