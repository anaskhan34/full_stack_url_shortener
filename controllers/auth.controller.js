import {
  checkExistEmail,
  creatingNewUser,
  generateToken,
  hashPassword,
  verifyPassword,
} from "../services/shortener.services.js";
import { loginSchema, registerSchema } from "../validators/auth.validator.js";
// Register page
export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/");

  res.render("auth/register", {
    errors: req.flash("errors"),
  });
};

// Login page
export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");

  res.render("auth/login", {
    errors: req.flash("errors"),
  });
};

// Login
export const loginPage = async (req, res) => {
  if (req.user) return res.redirect("/");

  try {
    const { data, error } = loginSchema.safeParse(req.body);

    if (error) {
      const errors = error.issues.map((err) => err.message);

      req.flash("errors", errors);
      return res.redirect("/login");
    }

    const { email, password } = data;

    const existEmail = await checkExistEmail(email);

    if (!existEmail) {
      req.flash("errors", "Invalid email or password");
      return res.redirect("/login");
    }

    const isValidPassword = await verifyPassword(existEmail.password, password);

    if (!isValidPassword) {
      req.flash("errors", "Invalid email or password");
      return res.redirect("/login");
    }

    const token = generateToken({
      id: existEmail.id,
      name: existEmail.name,
      email: existEmail.email,
    });

    res.cookie("access_token", token);

    return res.redirect("/");
  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).send("Server Error");
  }
};

// Register
export const registerPage = async (req, res) => {
  if (req.user) return res.redirect("/");

  try {
    const { data, error } = registerSchema.safeParse(req.body);

    if (error) {
      const errors = error.issues.map((err) => err.message);

      req.flash("errors", errors);

      return res.redirect("/register");
    }

    const { name, email, password } = data;

    const existEmail = await checkExistEmail(email);

    if (existEmail) {
      req.flash("errors", "User already exists");

      return res.redirect("/register");
    }

    const hashedPassword = await hashPassword(password);

    await creatingNewUser({
      name: name.toLowerCase().trim(),

      email: email.toLowerCase().trim(),

      password: hashedPassword,
    });

    return res.redirect("/login?success=registered");
  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).send("There is some problem in server");
  }
};

// protected routes
export const getMe = (req, res) => {
  if (!req.user) {
    return res.redirect("/login");
  }

  res.send(
    `<h1>hello ${req.user.name} - ${req.user.email} </h1> \n <a href="/">go</a>`,
  );
};

// logout
export const getLogout = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/login");
};
