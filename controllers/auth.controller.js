import {
  checkExistEmail,
  creatingNewUser,
  generateToken,
  hashPassword,
  verifyPassword,
} from "../services/shortener.services.js";

export const getRegisterPage = (req, res) => {
  res.render("auth/register");
};
export const getLoginPage = (req, res) => {
  res.render("auth/login");
};

//! Login
export const loginPage = async (req, res) => {
  let { email, password } = req.body;
  // console.log(email, password);

  const existEmail = await checkExistEmail(email);

  if (!existEmail) {
    return res.redirect("/login?error=user_not_found");
  }

  const isValidPassword = await verifyPassword(existEmail.password, password);

  if (!isValidPassword) {
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
