import { Response } from "express";
import UserServices from "../services/UserServices";

export const sendUserToken = async (user: any, statusCode: number, res: Response) => {
    const refreshToken = UserServices.generateRefreshToken(user.id, user.role)
    const accessToken = UserServices.generateAccessToken(user.id, user.role)

    const refreshTokenOptions = {
      expires: new Date( Date.now() + parseInt(process.env.REFRESH_TOKEN_COOKIE_EXPIRES as string) * 24 * 60 * 60 *1000 ),
      httpOnly: true,
      path: "/",
      secure: false,
    };
    res.json({...user,accessToken}).cookie("jwt",refreshToken,refreshTokenOptions ).status(statusCode)
};
