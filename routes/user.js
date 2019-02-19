var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/signin", (req, res, next) => {
  res.render("user/signin", {title: "Sign In Quizy"});
});

router.get("/signup", (req, res, next) => {
  res.render("user/signup", { title: "Sign Up Quizy" });
});

module.exports = router;
