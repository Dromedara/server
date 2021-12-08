const {Router} = require('express');
const materialsModel = require('../models/material');
const router = Router();

router.get('/read', (req, res) => {
    materialsModel.find({group: req.user.group}).then(mat => {
        res.send(mat.map(({_id, title, value, group}) =>
            ({id: _id, title, value, group})))
    }).catch((e) => {
        console.log(e)
        res.sendStatus(400);
    });
})

router.post('/add', (req, res) => {
    const {title, value, group} = req.body;
    console.log(req.user)
    materialsModel
        .create({title, value, group})
        .then((hw) => {
            const {id: _id, title, value, group} = hw;
            res.send({id: _id, title, value, group});
        })
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

router.delete('/delete', async (req, res, next) => {
    const {id} = req.body;
    materialsModel
        .findByIdAndDelete({ _id: id })
        .then(() => res.sendStatus(200))
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

module.exports = router;
