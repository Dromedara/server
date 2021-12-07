const {Router} = require('express');
const Mat_Model = require('../models/material');
const router = Router();


router.get('/materials', (req, res) => {
    Mat_Model.find({userId:req.user.id}) .sort({createdAt: -1}).then(mat => {
        res.send(mat.map(({_id, title, value, group}) =>
            ({id: _id, title, value, group})))
    }).catch((e) => {
        console.log(e)
        res.sendStatus(400);
    });
})

router.post('/materials', (req, res) => {
    const {title, value, group} = req.body;
    console.log(req.user)
    Mat_Model
        .create({title, value, group, userId:req.user.id})
        .then((mat) => {
            const {id: _id, title, value, group} = mat;
            res.send({id: _id, title, value, group});
        })
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

router.delete('/materials', async (req, res, next) => {
    const {id} = req.body;
    Mat_Model
        .findByIdAndDelete({ _id: id })
        .then(() => res.sendStatus(200))
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

module.exports = router;