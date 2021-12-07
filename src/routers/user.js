const {Router} = require('express');

const UserModel = require('../models/user');

const router = Router();

const {generateToken} = require('../utils');

router.post('/login', (req, res) => {
    const {login: loginFromReq, pass: passFromReq} = req.body;
    if (!loginFromReq || !passFromReq) return res.sendStatus(400);

    UserModel
        .findOne({login: loginFromReq})
        .then((user) => {
            if (!user) return res.sendStatus(400);
            const {_id: id, login, pass, name, group} = user;
            if (pass !== passFromReq) return res.sendStatus(400);
            const token = generateToken({id, login, group, name});
            res.cookie('auth', token, {httpOnly: true});
            res.send({id,group});
        })
        .catch(() => {
            res.sendStatus(400);
        })
})

router.post('/logout', async (req, res) => {
    res.clearCookie('auth');
    res.sendStatus(200);
})

module.exports = router;