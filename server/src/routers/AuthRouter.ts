import express from "express";
import { getAccessToken, logout, register, test } from "../controllers/AuthController";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";

const router = express.Router()

router.route('/register').post(register)
router.route('/refresh').get( getAccessToken)
router.route('/logout').post(logout)
router.route('/test').get(isAuthenticatedUser,test)



export default router;