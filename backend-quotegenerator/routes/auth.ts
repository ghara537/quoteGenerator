import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express'


const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("token");
  if (!token) return res.status(401).send("Access Denied");
  try {
    const verified = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );
    req.body.userStatus = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export default verifyToken;