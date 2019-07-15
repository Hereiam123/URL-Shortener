const express = require("express");

const router = express.Router();

const Url = require("../models/Url");

//@Route GET /:urlCode
//@Desc Redirect to url encoded
router.get("/:urlCode", async (req, res) => {
  try {
    //See if long version of url exists in DB for short code request
    const url = await Url.findOne({ urlCode: req.params.urlCode });
    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;
