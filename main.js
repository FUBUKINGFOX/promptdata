// == encoding in UTF-8 ==
const { load_config } = require("./bin/config_loader")
//init
load_config("./config")

const { articleURL_sercher } = require("./bin/article_sercher")
//main




if (require.main === module) {
    articleURL_sercher("pvc")
    .then((list)=>{
        console.log(list)
    })
}
