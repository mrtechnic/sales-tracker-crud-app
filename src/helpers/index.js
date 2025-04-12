import jwt from 'jsonwebtoken';


export function generateJWT(payload, expiresIn = "1w") {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

export function decodeJWT(token){
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}