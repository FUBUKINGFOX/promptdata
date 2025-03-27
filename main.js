// == encoding in UTF-8 ==
const { load_config } = require("./bin/config_loader")
//init
load_config()

const { articleURL_sercher } = require("./bin/article_sercher")
//main

articleURL_sercher("pvc")
.then((list)=>{
    console.log(list)
})


// if (require.main === module) {
//     main()
// }
