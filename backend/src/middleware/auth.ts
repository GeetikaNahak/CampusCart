import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user";

declare global {
  namespace Express {
    interface Request {
      userId: string;
      authId: string;
    }
  }
}

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});



export const jwtParse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("authorization error");
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = jwt.decode(token) as jwt.JwtPayload;

    if (!decoded || !decoded.sub) {
      return res.sendStatus(401);
    }

    const authId = decoded.sub;
    const user = await User.findOne({ authId });

    if (!user) {
      console.log("Error here")
      return res.sendStatus(401);
    }
    req.authId = authId;
    req.userId = user._id.toString();

    next();
  } catch (error) {
    console.log("JWT parse error:");
    return res.sendStatus(401);
  }
};
