const express = require('express')
const router = express.Router()

const newsController = require('./controllers/newsController');


router.get('/null', (req, res) => {
    res.json('Hello')
})
router.get('/news/:page?', newsController.getHeadlines)
router.get('/news/everything/:query/:page?',newsController.mainSearchByKeyWord)

module.exports = router