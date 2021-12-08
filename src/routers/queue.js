const {Router} = require('express');
const queueModel = require('../models/queue');
const router = Router();

router.get('/list', (req, res) => {
    const {group} = req.user;
    queueModel
        .find({group})
        .sort({createdAt: -1})
        .then(data => {
            res.send(data.map(({_id, group, students}) => ({id: _id, group, students})))
        })
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        });
})

router.post('/create', (req, res) => {
    const {title} = req.body;
    const {group} = req.user;

    queueModel
        .create({title, group, students: []})
        .then(({_id}) => {
            res.send({id: _id});
        })
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

router.post('/interact', (req, res) => {
    const {id: queueId} = req.body;
    const {id: userId} = req.user;
    queueModel
        .findById({ _id: queueId })
        .then(data => {
            const {students, title, group} = data;
            const updStudents = students.includes(userId)
                ? students.filter(item => item.toString() !== userId)
                : [...students, userId];

            data
                .updateOne({title, group, students: updStudents})
                .then(() => {
                    res.send({id: queueId})
                })
        })
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

router.delete('/reset', async (req, res, next) => {
    const {id} = req.body;
    queueModel
        .findByIdAndDelete({ _id: id })
        .then(() => res.sendStatus(200))
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

module.exports = router;