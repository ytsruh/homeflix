const express = require("express");
const router = express.Router();

//Import routes
const movies = require("./movies");
const shows = require("./shows");
const episodes = require("./episodes");

//Router specific middleware
router.use("*", (req, res, next) => {
  //Check if request method is POST or DELETE
  if (req.method == "POST" || req.method == "PUT" || req.method == "DELETE") {
    //Check if Authorisation header is set and correct or reject the request
    if (req.headers.authorization === process.env.AUTH_HEADER) {
      next();
    } else {
      res.json({ message: "You are not authorised to complete this action" });
    }
  } else {
    next();
  }
});

//Set routes
router.use("/movies", movies);
router.use("/shows", shows);
router.use("/episodes", episodes);

module.exports = router;
