import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
type UserParamsT = {
  userName: string;
  email: string;
  password: string;
  profilePicture: string;
  teamId: number;
};
class UserServices {
  async CreateUser({ userName, email, password, profilePicture, teamId, }: UserParamsT) {
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          userName,
          email,
          password: hashPassword,
          profilePicture,
          teamId,
        },
      });
 console.log(user);
      if (user) {
        const { password, ...rest } = user;
       
        
        return rest;
        
      }
    } catch (error: any) {

      console.log(error);
      throw new Error(error);
      
    }
  }
  generateAccessToken(userId: string, userRole: string) {
    return jwt.sign(
      { userId, role: userRole },
      process.env.ACCESSTOKEN_SECRET_KEY as string,
      { expiresIn: process.env.ACCESS_TOKENEXPIRES }
    );
  }
  generateRefreshToken(userId: string, userRole: string) {
    return jwt.sign(
      { userId, role: userRole },
      process.env.REFRESHTOKEN_SECRET_KEY as string,
      { expiresIn: process.env.REFRESH_TOKENEXPIRES }
    );
  }
  async finduserBytoken(decode: {  userId: string, userRole: string  }) {
   const user = await prisma.user.findFirst({
      where: {
        userId:decode.userId,
        role:decode.userRole
      }
   })
    return user;
  }
}

export default new UserServices();
