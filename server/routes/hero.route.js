var express = require('express');

var Hero = require('../schema/hero.model');

var router = express.Router();

const heroesPerPage = 25;

/**
 * GET /
 * * Get a list of superheroes
 * * Query: page
 */
router.get('/:page?', (req, res, next) => {
  const page = req.param('page', 0);
  Hero.find({})
    .skip(page * heroesPerPage)
    .limit(heroesPerPage)
    .then(heroes => res.status(200).json(heroes));
});

module.exports = router;
