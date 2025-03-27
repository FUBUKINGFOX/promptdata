// == encoding in UTF-8 ==
const jsdom = require("jsdom");
const { get_cfg_value } = require("./config_loader")
//init
const page = Number(get_cfg_value("spider","web_crawler","reference_article","1")) // need debug 
const API_KEY = get_cfg_value("API","SerpAPI","API_KEY","0")


function ScholarGoogle_API_url(quation,page){
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


async function articleURL_sercher(quation){
    const url = ScholarGoogle_API_url(quation, page)
    const res = await fetch(url,{method:"GET",headers:new Headers({"user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"})})
    const json = await res.json()
    const list = []
    for(const i of json.organic_results){
        list.push(i.link)
    }
    return list
}
module.exports.articleURL_sercher = articleURL_sercher


if (require.main === module) {
    //test command
    const quation = "pvc materials"

}

