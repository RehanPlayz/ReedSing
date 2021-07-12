const { Random } = require("something-random-on-discord")
 
module.exports = {
  name: "neko",
   category: "fun",
  
  description: "Obten frescas imagenes Neko :D",
run: async (client, message, args) => {
  
    let data = await Random.getNeko()
    message.channel.send(data)
  
}
}
