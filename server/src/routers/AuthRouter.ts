import express from "express";
import {
  forgotPassword,
  getAccessToken,
  login,
  logout,
  register,
  resetPassword,
  sendOtp,
  getUser,
  verifyOtp,
} from "../controllers/AuthController";
import isAuthenticatedUser from "../middlewares/isAuthenticatedUser";
const router = express.Router();

router.route("/register").post(register);
router.route("/refresh").get(getAccessToken);
router.route("/logout").post(logout);
router.route("/login").post(login);
router.route("/getuser").get(isAuthenticatedUser, getUser);
router.route("/loginwithotp").post(sendOtp);
router.route("/verifyotp").post(verifyOtp);

router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword/:resetToken").post(resetPassword);

export default router;
