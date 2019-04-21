const express = require("express");
const passport = require("passport");
const router = express.Router();

/* GET users listing. */

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

router.get("/", isLoggedIn, (req, res, next) => {
  console.log(req.user);
  next();
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/user/signup"
  })
);

router.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/",
    failureRedirect: "/user/signin"
  })
);

router.get("/signout", function(req, res, next) {
  req.session.destroy(function(err) {
    req.isLogged = false;
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
    req.isLogged = false;
    return next();
  }
  res.redirect("/");
}

module.exports = router;
