const db = require("quick.db")

module.exports = {
  name: "delcmd",
  usage: "delcmd <cmd_name>",
  description: "Elimina el comando personalizado",
  category: "administration",
  botPermission: ['ADMINISTRATOR'],
  authorPermission: ['ADMINISTRATOR'],
  run: (client, message, args) => {

    let cmdname = args[0]

    if(!cmdname) return message.channel.reply("<:no:863629746042961932> | Dame el nombre del comando, `delcmd <cmd_name>`").then(msg => {msg.delete({ timeout: 10000 })})

    let database = db.get(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.reply("<:no:863629746042961932> | No se puede encontrar este comando.")

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(`Eliminado el **${cmdname}** comando!`)


    } else {
      return message.channel.reply("<:no:863629746042961932> | Lo siento, pero no puedo encontrar ese comando!").then(msg => {msg.delete({ timeout: 10000 })})
    


  }
  }
}
 