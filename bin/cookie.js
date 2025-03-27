const fs = require("node:fs")

function loadCookie(cookie_path){
    if (!cookie_path){
        cookie_path = "./config/COOKIE/cookie.header.txt"
    }
    return fs.readFileSync(cookie_path,"utf-8")
}
module.exports.loadCookie = loadCookie