const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWS_KEY);

module.exports = NewsController = {
    getHeadlines: async (req, res) => { 
        let { page } = req.params
        if(!page) page = 1
        const result = await newsapi.v2.topHeadlines({
            country: 'us',
            page: page || 1
        })
        return res.json(result)
    },
    mainSearchByKeyWord: async (req, res) => {
        let { query, page } = req.params
        if(!page) page = 1
        const result = await newsapi.v2.everything({
            q: query,
            language: 'en',
            sortBy: 'relevancy',
            page: page
        }) 
        return res.json(result)
    }
}