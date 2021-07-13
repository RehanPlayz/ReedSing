const db = require("quick.db")
const discord = require("discord.js")

module.exports = {
  name: "status",
  description: "Cambiar el estado del bot",
  usage: "status <new-status>",
  category: "administration",
  botPermission: ['ADMINISTRATOR'],
  authorPermission: ['ADMINISTRATOR'],
  run: async (client, message, args) => {
    
  
    //ARGUMENT
     if(!args.length) {
      return message.channel.send("<:no:863629746042961932> | Por favor, envíe un mensaje de estado")
    }
    
 db.set(`status`, args.join(" "))
 client.user.setActivity(args.join(" ")); 
 message.channel.send("Se actualizo el estado.")

    
  }
}