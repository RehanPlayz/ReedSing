const db = require("quick.db")
const config = require("../../config/config")

module.exports = {
  name: "prefix",
  category: "administration",
  botPermission: ['ADMINISTRATOR'],
  authorPermission: ['ADMINISTRATOR'],
  usage: "prefix <prefix>",
  description: "Cambia el prefix del bot.",
  run: async (client, message, args) => {
    
    if(!args[0]) {
      return message.channel.send("<:no:863629746042961932> | Por favor elije que prefix pondras.")
    } 
    
    if(args[1]) {
      return message.channel.send("v No puedes poner un prefix de doble argumento.")
    }
    
    if(args[0].length > 3) {
      return message.channel.send("<:no:863629746042961932> | No puedes poner un prefix con mas de 3 caracteres.")
    }
    
    if(args.join("") === config.discord.default_prefix) {
      db.delete(`prefix_${message.guild.id}`)
     return await message.channel.send("Prefix Eliminado ✅")
    }
    
    db.set(`prefix_${message.guild.id}`, args[0])
  await message.channel.send(`El nuevo prefix es ${args[0]}`)
    
  }
}