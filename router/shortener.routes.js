import { readFile, writeFile } from "fs/promises";
import crypto from "crypto";
import { Router } from "express";
import path from "path";
import {
  getEditPage,
  getShortenerData,
  postShortenerData,
  redirectingToLinkUrl,
} from "../controllers/urlShortener.controller.js";

const router = Router();

// Home page
router.get("/", getShortenerData);

// Create short URL
router.post("/", postShortenerData);

router.get("/404", (req, res) => {
  res.status(404).send("Page Not Found");
});

// Redirect short URL
router.get("/:shortCode", redirectingToLinkUrl);

router.route("/edit/:id").get(getEditPage);

export const shortenUrl = router;
