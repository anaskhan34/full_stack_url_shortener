import { Router } from "express";

import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

router.get("/register", authControllers.getRegisterPage);
router
  .route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.loginPage);

export const authRoutes = router;
