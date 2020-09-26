const api = axios.create({
    baseURL: 'http://localhost:3000'
});
//||'https://eheadlines-api.herokuapp.com/'
const logo = document.getElementById('logo')
const inpSearch = document.getElementById('inp-search')
const dashboard = document.getElementById('dashboard')
const topTag = document.querySelector('.top')
let chosenPage = 1
document.getElementById(`p-${chosenPage}`).classList.add('highlight-btn')
let query = ''

document.addEventListener('DOMContentLoaded', () =>{
    myFunc()
})  
function scrollToTop() {   
    topTag.scrollIntoView() 
} 
const copyToClipboard = str => {
    const el = document.createElement('input');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
logo.addEventListener('click', () => {
    document.querySelector('.highlight-btn').classList.remove('highlight-btn')
    document.getElementById(`p-1`).classList.add('highlight-btn')
    myFunc()
})

search.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.highlight-btn').classList.remove('highlight-btn')
    document.getElementById(`p-1`).classList.add('highlight-btn')
    fetchNewsApi()     
})

async function myFunc() { 
    query = '/news'
    const res = await api.get('/news')
    const result = await res.data
    displayMainResults(result)  
}
async function choosePage(pageNumber) {
    chosenPage = pageNumber

    document.querySelector('.highlight-btn').classList.remove('highlight-btn')
    document.getElementById(`p-${chosenPage}`).classList.add('highlight-btn')

    res = await api.get(`${query}/${chosenPage}`)
    const result = await res.data
    displayMainResults(result)
    inpSearch.focus()
    inpSearch.select()
}

async function fetchNewsApi() {
    let res
    if (inpSearch.value.trim() === '' || !inpSearch.value) {
        query = `/news/everything/us`
        res = await api.get(`/news/everything/us`)
    } else {
        query = `/news/everything/${inpSearch.value.replace(" ", "+")}`
        res = await api.get(`/news/everything/${inpSearch.value.replace(" ", "+")}`)
    }
    const result = await res.data
    displayMainResults(result)
    inpSearch.focus()
    inpSearch.select()
}

function displayMainResults(result) {
    
    if (result.articles.length === 0) {
        dashboard.innerHTML = 
            `<div class="nodata">
            <div class="nodata-icon"><i class="fa fa-search"></i>
            </div>
            <p>No data found</p>
            <p>Please check your typo</p>
            </div>`
        return
    }
    const data = filterRepeatResults(result.articles)
    const formatedData = data.map(
        ({ author, content, description, publishedAt, source, title, url, urlToImage }) => {
            if (!content || !urlToImage || !description ||!author) {
                return
            } else {
                return (`<div class="card">
            <h3 class="title">${title}</h3>
            <p class="author">${author}</p>
            <p class="content">${content}</p>
            <p class="link-p"><a href=${url} class="link">Original article</a></p>
            <p class="description">${description}</p>
            <p class="pubAt">${publishedAt.replace(/[TZ]/g, " ")}</p>
            <p class="source">${source.name}</p>
            <img src=${urlToImage} width="100%" class="img">
        </div>`)
            }
        })
        dashboard.innerHTML = formatedData.join("")
}

// let a = [1,1,2,2,3,3,4,5,5,6,6]
// console.log(filterRepeatResults(a))
function filterRepeatResults(data) {
    let go = 1
    let keep = 0
    while (go < data.length) {
        let temp = data[go]
        if (temp !== data[keep]) {
            keep++
            data[keep] = temp
            go++
        } else {
            go++
        }
    }

    return data.splice(0,keep+1)

}