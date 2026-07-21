import path from "path";
import express from "express";
import { shortenUrl } from "./router/shortener.routes.js";
import { authRoutes } from "./router/auth.routes.js";
import cookieParser from "cookie-parser";
import { verifyJwtAuthentication } from "./middleware/verify-jwt-auth.js";
import flash from "connect-flash";
import session from "express-session";

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// router

app.use(cookieParser());

app.use(session({ secret: "my-key", resave: true, saveUninitialized: false }));
app.use(flash());

// jwt middleware
app.use(verifyJwtAuthentication);
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});
//
app.use(authRoutes);
app.use(shortenUrl);
// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
