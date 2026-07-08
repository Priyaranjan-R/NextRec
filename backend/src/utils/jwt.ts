import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;

if (!JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is not defined in environment variables."
  );
}

const JWT_EXPIRES = (process.env.JWT_EXPIRES_IN ||
  "7d") as SignOptions["expiresIn"];

export const generateToken = (
  userId: number
): string => {
  return jwt.sign(
    {
      userId,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES,
    }
  );
};

export const verifyToken = (
  token: string
): { userId: number } => {
  return jwt.verify(
    token,
    JWT_SECRET
  ) as {
    userId: number;
  };
};