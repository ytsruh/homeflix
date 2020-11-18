const express = require("express");
const router = express.Router();
const Episode = require("../db").sequelize.models.Episode;
const Show = require("../db").sequelize.models.Show;
const upload = require("./helpers");

/* FIND one Episode */
router.get("/:id", async (req, res) => {
  try {
    const episode = await Episode.findByPk(req.params.id, { include: [Show] });
    res.status(200).json({
      message: `Successfully fetched episode with id:${req.params.id}`,
      data: episode
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err });
  }
});

/* CREATE an Episode */
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
        const episode = Episode.create(req.body);
        res.status(200).json({
          message: "Success. The Episode has been saved",
          data: req.body,
          model: episode
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }
  });
});

/* UPDATE an Episode */
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
        const update = Episode.update(req.body, {
          where: { id: req.params.id }
        });
        res.status(200).json({
          message: "Success. The Episode has been updated",
          data: req.body,
          model: update
        });
      } catch (err) {
        res.status(500).json({ message: err });
      }
    }
  });
});

/* DELETE one Episode */
router.delete("/:id", async (req, res) => {
  try {
    await Episode.destroy({ where: { id: req.params.id } });
    res.status(200).json({
      message: "Success. The Episode has been deleted"
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
