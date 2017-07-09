var express = require('express');

var Duel = require('../schema/duel.model');
var Vote = require('../schema/vote.model');

var router = express.Router();

/**
 * GET /:id
 * * Get duel by an id
 * * Query: An id of a duel
 */
router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    Duel.findOne({ _id: id })
        .populate('heroes')
        .then(duel => {
            if (!duel)
                return res.status(404).json(false);

            res.status(200).json(duel.heroes);
        })
        .catch(() => res.status(404).json(false));
});

/**
 * PUT /
 * * Vote for a hreo on a duel
 * * Body: duel, hero
 */
router.put('/', (req, res, next) => {
    const duelId = req.body.duel;
    const heroId = req.body.hero;

    Duel.findOne({ _id: duelId }).then(duel => {
        if (!duel)
            return res.status(404).json(false);

        Vote.create({ duel: duelId, hero: heroId })
            .then(() => res.status(200).json(true));
    });
});

/**
 * POST /
 * * Create new duel
 * * Body: List of participating heroes
 */
router.post('/', (req, res, next) => {
    let heroes = req.body;

    if (!heroes || !heroes.length || heroes.length !== 10) 
        return res.status(400).json(false);
        
    // Verify there are no duplicate heroes
    if ((new Set(heroes)).size !== heroes.length) 
        return res.status(400).json(false);

    heroes = heroes.sort();

    Duel.findOne({ heroes }).then(doc => {
        if (doc)
            return res.status(200).json(doc._id);

        Duel.create({ heroes })
            .then(doc => res.status(201).json(doc._id));
    });
});

module.exports = router;
