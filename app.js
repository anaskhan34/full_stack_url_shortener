import path from "path";
import express from "express";
import { shortenUrl } from "./router/shortener.routes.js";
import { authRoutes } from "./router/auth.routes.js";

const app = express();

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

// router

app.use(authRoutes);
app.use(shortenUrl);
// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
