import crypto from "crypto";
// import { loadLinks, saveLinks, getUrlLink } from "../model/dataHandle.model.js";
import {
  checkingShortLink,
  getAllShortLinks,
  postShortLink,
} from "../services/shortener.services.js";

export const getShortenerData = async (req, res) => {
  try {
    const links = await getAllShortLinks();
    console.log("all links", links);

    res.render("index", {
      links,
      host: req.get("host"),
      protocol: req.protocol,
      error: null,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const postShortenerData = async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    if (!url) {
      return res.status(400).send("URL Required");
    }

    const finalShortCode =
      shortCode?.trim() || crypto.randomBytes(4).toString("hex");

    const existing = await checkingShortLink(finalShortCode);

    if (existing) {
      return res.status(400).send("Short Code Already Exists");
    }

    await postShortLink({
      url,
      shortCode: finalShortCode,
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const redirectingToLinkUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const link = await checkingShortLink(shortCode);
    console.log("specify", link);

    if (!link.url) {
      return res.redirect("/404");
    }

    res.redirect(link.url);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};
