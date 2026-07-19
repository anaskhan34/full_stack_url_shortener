export const getRegisterPage = (req, res) => {
  res.render("auth/register");
};
export const getLoginPage = (req, res) => {
  res.render("auth/login");
};

export const loginPage = (req, res) => {
  // res.setHeader("set-cookie", "isSignIn=true;path=/;");
  res.cookie("isSignIn", true);
  res.redirect("/");
};
