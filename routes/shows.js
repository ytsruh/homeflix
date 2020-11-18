const express = require("express");
const router = express.Router();
const Show = require("../db").sequelize.models.Show;
const upload = require("./helpers");

/* FIND all shows */
router.get("/", async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.status(200).json({
      message: "Successfully fetched all shows",
      data: shows
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/* FIND one Show */
router.get("/:id", async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    const episodes = await show.getEpisodes();
    res.status(200).json({
      message: `Successfully fetched show with id:${req.params.id}`,
      data: show,
      episodes: episodes
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

/* CREATE a show */
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
        const show = Show.create(req.body);
        res.status(200).json({
          message: "Success. The Show has been saved",
          data: req.body,
          model: show
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }
  });
});

/* UPDATE a show */
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
        const update = Show.update(req.body, { where: { id: req.params.id } });
        res.status(200).json({
          message: "Success. The Show has been updated",
          data: req.body,
          model: update
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }
  });
});

/* DELETE one show */
router.delete("/:id", async (req, res) => {
  try {
    await Show.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      message: "Success. The Show has been deleted"
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
