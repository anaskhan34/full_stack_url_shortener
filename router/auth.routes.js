import { Router } from "express";

import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

router
  .route("/register")
  .get(authControllers.getRegisterPage)
  .post(authControllers.registerPage);
router
  .route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.loginPage);

router.route("/me").get(authControllers.getMe);
router.route("/logout").get(authControllers.getLogout);

export const authRoutes = router;
