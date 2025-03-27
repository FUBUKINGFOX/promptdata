// == encoding in UTF-8 ==
const jsdom = require('jsdom')
const { get_cfg_value } = require("./config_loader")
const { loadCookie } = require("./cookie")
//init
// const page = Number(get_cfg_value("spider","web_crawler","reference_article","1")) // need debug 
const API_KEY = get_cfg_value("API","SerpAPI","API_KEY","0")
const use_serpAPI = get_cfg_value("API","SerpAPI","use_serpAPI",false)
const use_cookie = get_cfg_value("API","COOKIE","use_cookie",true)

//google Scholar url
function ScholarGoogle_API_url(quation){
    const words = quation.split(" ")
    let quation_ = ""
    
    for(const i of words){
        if (words.length != 1){
            quation_ += "+" + i
        }
        else if (words.length == 1){
            quation_ = i
        }
        else{
            console.log("creat url ERROR")
        }
    }

    return `https://serpapi.com/search.json?engine=google_scholar&q=${quation_}&api_key=${API_KEY}`
}

function ScholarGoogle_url(quation){
    const words = quation.split(" ")
    let quation_ = ""
    
    for(const i of words){
        if (words.length != 1){
            quation_ += "+" + i
        }
        else if (words.length == 1){
            quation_ = i
        }
        else{
            console.log("creat url ERROR")
        }
    }

    return `https://scholar.google.com/scholar?hl=zh-TW&as_sdt=0%2C5&q=${quation_}&btnG=`
}
//=============================================================

async function articleURL_sercher(quation){
    const list = []
    
    if(use_serpAPI){
        const url = ScholarGoogle_API_url(quation)
        const res = await fetch(url,{method:"GET",headers:new Headers({"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"})})
        json = await res.json()
        list.push(json.search_information.total_results)// total_results
        for(const i of json.organic_results){
            list.push(i.link)
        }
    }
    else if(use_cookie){
        const cookie = loadCookie()
        const header = new Headers({
            "cookie": cookie,
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
        })  
        const res = await fetch(ScholarGoogle_url(quation),{method:"GET",headers:header})
        const html = await res.text()
        const dom = new jsdom.JSDOM(html)
        const articles = dom.window.document.getElementsByClassName("gs_rt")
        list.push(dom.window.document.getElementById("gs_ab_md").getElementsByTagName("div")[0].textContent)
        for (const article of articles){
            list.push(article.getElementsByTagName("a")[0].href)
        }
    }

    return list
}
module.exports.articleURL_sercher = articleURL_sercher


if (require.main === module) {
    //test command
    const quation = "pvc materials"

}

