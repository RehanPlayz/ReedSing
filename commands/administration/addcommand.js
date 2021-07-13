const db = require("quick.db")

module.exports = {
  name: "addcmd",
  usage: "addcmd <cmd_name> <cmd_responce>",
  description: "Agrega comandos personalizados de gremio",
  category: "administration",
  botPermission: ['ADMINISTRATOR'],
  authorPermission: ['ADMINISTRATOR'],
  run: (client, message, args) => {
    let cmdname = args[0]

    if(!cmdname) return message.channel.reply(`<:no:863629746042961932> | Tienes que dar el nombre del comando, \`addcmd <cmd_name> <cmd_responce>\``).then(msg => {msg.delete({ timeout: 10000 })})

    let cmdresponce = args.slice(1).join(" ")

    if(!cmdresponce) return message.channel.reply(`<:no:863629746042961932> | Tienes que dar el comando cmd responder, \`addcmd <cmd_name> <cmd_responce>\``).then(msg => {msg.delete({ timeout: 10000 })})

    let database = db.get(`cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname.toLowerCase())) return message.channel.send("<:no:863629746042961932> | Este nombre de comando ya está agregado en los comandos personalizados del gremio..")

    let data = {
      name: cmdname.toLowerCase(),
      responce: cmdresponce
    }

    db.push(`cmd_${message.guild.id}`, data)

    return message.channel.send("Se añadido **" + cmdname.toLowerCase() + "** como un comando personalizado en el gremio.")


  }
}