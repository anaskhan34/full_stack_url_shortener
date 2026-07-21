import crypto from "crypto";
// import { loadLinks, saveLinks, getUrlLink } from "../model/dataHandle.model.js";
import {
  checkingShortLink,
  getAllShortLinks,
  postShortLink,
} from "../services/shortener.services.js";
import z from "zod";

export const getShortenerData = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const links = await getAllShortLinks(req.user.id);
    let access_token = req?.cookies?.access_token;

    res.render("index", {
      links,
      host: req.get("host"),
      protocol: req.protocol,
      error: null,
      access_token,
      errors: req.flash("errors"),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const postShortenerData = async (req, res) => {
  if (!req.user) return res.redirect("/login");
  try {
    const { url, shortCode } = req.body;

    if (!url) {
      return res.status(400).send("URL Required");
    }

    const finalShortCode =
      shortCode?.trim() || crypto.randomBytes(4).toString("hex");

    const existing = await checkingShortLink(finalShortCode);

    if (existing) {
      req.flash("errors", "Short Code Already Exists");
      return res.redirect("/");
    }

    await postShortLink({
      url,
      shortCode: finalShortCode,
      userId: req.user.id,
    });

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const redirectingToLinkUrl = async (req, res) => {
  try {
    // if (!req.user) res.redirect("/login");
    const { shortCode } = req.params;

    const link = await checkingShortLink(shortCode);

    if (!link) {
      return res.status(404).send("Short URL not found");
    }

    return res.redirect(link.url);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

export const getEditPage = async (req, res) => {
  try {
    if (!req.params) {
      return res.redirect("/");
    }
    const { data: id } = z.coerce.number().int().safeParse(req.params);

    const link = await getParamIdData(id);

    if (!link) {
      return res.redirect("/");
    }

    res.render("edit-page", {
      links: link,
      host: req.get("host"),
      protocol: req.protocol,
      error: null,
      access_token,
      errors: req.flash("errors"),
    });
  } catch (error) {
    console.log("error:", error);
  }
};
