const express = require("express");
const passport = require("passport");
const router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/signin", (req, res, next) => {
  res.render("user/signin", { title: "Sign In Quizy" });
});

router.get("/signup", (req, res, next) => {
  res.render("user/signup", { title: "Sign Up Quizy" });
});

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("user/profile", { title: "Profile"});
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
  if (
    req.session.destroy(function(err) {
      res.redirect("/");
    })
  );
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/user/signin");
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
