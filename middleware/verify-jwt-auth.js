import { verifyJwtToken } from "../services/shortener.services.js";

export const verifyJwtAuthentication = (req, res, next) => {
  const token = req?.cookies?.access_token;
  //   console.log(token);

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decodedToken = verifyJwtToken(token);
    req.user = decodedToken;
    // console.log(req.user);
  } catch (error) {
    console.error("verifyJwtAuthentication token error", error);
    req.user = null;
  }
  return next();
};
