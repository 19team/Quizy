var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  console.log(req.isLogged);
  res.render("home/home", { isLogged: req.user ? true: false, username: req.user ? (req.user.firstname + " " + req.user.lastname) : "Not logged in"  });
});


module.exports = router;
