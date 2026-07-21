import {
  checkExistEmail,
  creatingNewUser,
  generateToken,
  hashPassword,
  verifyPassword,
} from "../services/shortener.services.js";

export const getRegisterPage = (req, res) => {
  if (req.user) res.redirect("/");
  res.render("auth/register", { errors: req.flash("errors") });
};
export const getLoginPage = (req, res) => {
  if (req.user) res.redirect("/");
  res.render("auth/login", { errors: req.flash("errors") });
};

//! Login
export const loginPage = async (req, res) => {
  if (req.user) res.redirect("/");
  let { email, password } = req.body;
  // console.log(email, password);

  const existEmail = await checkExistEmail(email);

  if (!existEmail) {
    req.flash("errors", "Invalid email and Password");
    return res.redirect("/login?error=user_not_found");
  }

  const isValidPassword = await verifyPassword(existEmail.password, password);

  if (!isValidPassword) {
    req.flash("errors", "Invalid email and Password");
    return res.redirect("/login?error=user_not_found");
  }

  // res.setHeader("set-cookie", "isSignIn=true;path=/;");
  // res.cookie("isSignIn", true);

  const token = generateToken({
    id: existEmail.id,
    name: existEmail.name,
    email: existEmail.email,
  });

  res.cookie("access_token", token);

  res.redirect("/");
};

export const registerPage = async (req, res) => {
  if (req.user) res.redirect("/");
  // console.log(req.body);
  try {
    let { name, email, password } = req.body;

    // 1. Basic Input Validation
    if (!name || !email || !password) {
      return res.status(400).send("all field are must");
    }

    const existEmail = await checkExistEmail(email);

    if (existEmail) {
      // console.log("canot craete", existEmail);
      req.flash("errors", "user already exist");
      return res.redirect("/register?error=email_exists");
    }

    //! hashing password
    const hashedPassword = await hashPassword(password);
    // console.log(hashedPassword);

    const createUser = await creatingNewUser({
      name,
      email,
      password: hashedPassword,
    });

    return res.redirect("/login?success=registered");
  } catch (error) {
    console.error("Registration Error:", error);
    return res.status(500).send("there is some problem in server");
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
