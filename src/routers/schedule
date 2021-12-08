const {Router} = require('express');
const homeworkModel = require('../models/homework');
const router = Router();

router.get('/homeworks', (req, res) => {
    homeworkModel.find({userId:req.user.id}) .then(hw => {
        res.send(hw.map(({_id, value, pairId, date}) =>
            ({id: _id, value, pairId, date})))
    }).catch((e) => {
        console.log(e)
        res.sendStatus(400);
    });
})

router.post('/homeworks', (req, res) => {
    const {value, pairId, date} = req.body;
    console.log(req.user)
    homeworkModel
        .create({value, pairId, date,userId:req.user.id})
        .then((hw) => {
            const {id: _id, value, pairId, date} = hw;
            res.send({id: _id, value, pairId, date});
        })
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})

router.delete('/homeworks', async (req, res, next) => {
    const {id} = req.body;
    homeworkModel
        .findByIdAndDelete({ _id: id })
        .then(() => res.sendStatus(200))
        .catch((e) => {
            console.log(e)
            res.sendStatus(400);
        })
})
const { JSDOM } = require("jsdom");
const axios = require("axios");
const baseUrl = 'https://student.itmo.ru/ru/timetable';

router.get('/', (req, res) => {
    const { group } = req.query;
    if (!group) return res.sendStatus(404);

    const link = `${baseUrl}/${group.toUpperCase()}/${group[2]}/${group[1]}`;

    getSchedule(link)
        .then(schedule => res.send({schedule}))
        .catch(() => res.sendStatus(400));
})

const getTextFromHtml = (htmlElement, query) => {
    return htmlElement.querySelector(query)?.textContent?.replace(/\s+/g, ' ').trim();
}

const pairTimes = ['08:20', '10:00', '11:40', '13:30', '15:20', '17:00', '18:40', '20:20'];
const weekDays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

const getSchedule = (link) => {
    return axios
        .get(link)
        .then(result => {
            const dom = new JSDOM(result.data);
            const timetableBlocks = dom.window.document.querySelectorAll(".timetable-article__row");

            const schedule = [];
            timetableBlocks.forEach(weekday => {
                const day = getTextFromHtml(weekday, '.timetable-article__day');
                if (day) {
                    const dayId = weekDays.indexOf(day);
                    const date = getTextFromHtml(weekday, '.timetable-article__date');
                    const details = weekday
                        .querySelector('.timetable-article__details')
                        .querySelectorAll('.timetable-article__row');

                    const timetable = []
                    details.forEach(detail => {
                        const time = getTextFromHtml(detail, '.timetable-article__col-time');
                        const regexp = /(\d{2}:\d{2})-(\d{2}:\d{2})\s+(.*)/;
                        const [_, start, finish, external] = time.match(regexp);
                        const pairId = pairTimes.indexOf(start);

                        timetable.push({
                            time,
                            start,
                            finish,
                            external,
                            pairId: pairId !== -1 && pairId,
                            room: getTextFromHtml(detail, '.timetable-article__room'),
                            address: getTextFromHtml(detail, '.timetable-article__address'),
                            subject: getTextFromHtml(detail, '.timetable-article__subject'),
                            instructor: getTextFromHtml(detail, '.timetable-article__instructor')
                        })
                    })

                    schedule.push({
                        day,
                        date,
                        timetable,
                        dayId: dayId !== -1 && dayId
                    });
                }
            })
            return schedule;
        })
};

module.exports = router;
