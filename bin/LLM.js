// === encoding in UTF-8 ===
const {Ollama} = require("ollama")

const {get_cfg_value, load_config} = require("./config_loader")

load_config("../config")
//init
const host = get_cfg_value("LLM","API","host","http://127.0.0.1")
const port = get_cfg_value("LLM","API","port","11434")
const model = get_cfg_value("LLM","API","model","gemma3")
const version = get_cfg_value("LLM","API","version","latest")

// console.log(host)

async function LLM_(message){

    const ollama = new Ollama({ host: `${host}:${port}`})

    const message_ = []

        message_.push({role: "user",content: message})

    try{
        const response = await ollama.chat({model : `${model}:${version}`,
            messages: message_,
            stream:false
        })

        return response
    }catch(error){

        console.error(error)

    }
}


if (require.main === module) {
  const message = "who are you ?"
  LLM_(message).then((res)=>{
    console.log(res.message.content)
  })
}


// module.exports.askFubuking = askFubuking
