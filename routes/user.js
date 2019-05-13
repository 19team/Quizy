const express = require("express");
const passport = require("passport");
const router = express.Router();
const models = require("../models");
const User = models.user;
const UserDetails = models.userdetails;

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
  UserDetails.findOne({
    where: {
      user_id: req.user.id
    },
    include: [{ model: models.user }]
  }).then(data => {
    //get user's data

    let trueQuizRaito;
    if (data.trueQuizQuantity + data.falseQuizQuantity === 0) {
      trueQuizRaito = 50;
    } else {
      trueQuizRaito =  (data.trueQuizQuantity/(data.trueQuizQuantity + data.falseQuizQuantity) * 100).toFixed(1);
    }
    const user = {
      firstname: data.user.dataValues.firstname,
      lastname: data.user.dataValues.lastname,
      email: data.user.dataValues.email,
      level: data.level,
      exp: data.exp,
      winMatchQuantity: data.winMatchQuantity,
      playedMatchQuantity: data.playedMatchQuantity,
      trueQuizQuantity: data.trueQuizQuantity,
      falseQuizQuantity: data.falseQuizQuantity,
      trueQuizSeries: data.trueQuizSeries,
      currentTrueQuizSeries: data.currentTrueQuizSeries,
      trueQuizRaitoProcess:
        '<div class="col-md-6"><div class="progress" style="height: 1.5rem"><div id="question-process-bar" class="progress-bar bg-success" role="progressbar" style="width:' + trueQuizRaito +  '%;"aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">'+ trueQuizRaito +'%</div><div class="progress-bar bg-danger" role="progressbar" style="width:'+ (100 - trueQuizRaito) + '%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">'+ (100 - trueQuizRaito) +'%</div></div></div>'
    };
    console.log(user);
    res.render("user/profile", {
      title: "Trang cá nhân",
      isLogged: req.isLogged,
      username: req.user
        ? req.user.lastname
        : "Not logged in",
      user: user
    });
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
