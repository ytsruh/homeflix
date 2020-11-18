const express = require("express");
const router = express.Router();
const Movie = require("../db").sequelize.models.Movie;
const upload = require("./helpers");

/* FIND all movies */
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json({
      message: "Successfully fetched all movies",
      data: movies
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/* FIND one movie */
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    res.status(200).json({
      message: `Successfully fetched movie with id:${req.params.id}`,
      data: movie
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/* CREATE a movie */
router.post("/", async (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).json({ message: err });
    } else if (!req.body) {
      res.status(500).json({
        message: "Error. No form was submitted"
      });
    } else {
      try {
        const movie = Movie.create(req.body);
        res.status(200).json({
          message: "Success. The Movie has been saved",
          data: req.body,
          model: movie
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }
  });
});

/* UPDATE a movie */
router.put("/:id", async (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.status(500).json({ message: err });
    } else if (!req.body) {
      res.status(500).json({
        message: "Error. No form was submitted"
      });
    } else {
      try {
        const update = Movie.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({
          message: "Success. The Movie has been updated",
          data: req.body,
          model: update
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }
  });
});

/* DELETE one movie */
router.delete("/:id", async (req, res) => {
  try {
    await Movie.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      message: "Success. The Movie has been deleted"
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
