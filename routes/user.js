const express = require("express");
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/signin", (req, res, next) => {
  var messages = req.flash("error");
  res.render("user/signin", {
    title: "Đăng nhập",
    isLogged: req.isLogged,
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.get("/signup", (req, res, next) => {
  var messages = req.flash("error");
  messages.forEach(element => {
    console.log(element);
  });
  res.render("user/signup", {
    title: "Đăng ký",
    isLogged: req.isLogged,
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("user/profile", {
    title: "Profile",
    isLogged: req.isLogged,
    username: req.user
      ? req.user.firstname + " " + req.user.lastname
      : "Not logged in"
  });
});

router.use("/", notLoggedIn, (req, res, next) => {
  next();
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signup"
  })
);

router.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/user/profile",
    failureRedirect: "/user/signin"
  })
);

router.get("/signout", function(req, res, next) {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    req.isLogged = true;
    return next();
  }
  res.redirect("/user/signin");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
