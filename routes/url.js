const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/Url");

//@Route POST /api/url/shorten
//@Desc Create a short version of Url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  //Check if base is a valid url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  //Create short url code
  const urlCode = shortId.generate();

  //Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      //Check if URL is already in DB
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      }
      //If no URL yet, create one
      else {
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });
        await url.save();

        //Send new shortened url as response
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    return res.status(401).json("Invalid long url");
  }
});

module.exports = router;
