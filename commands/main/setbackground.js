const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "sbackground",
  category: "main",
  aliases: ["sback"],
  usage: "sbackground <Atachh Image>",
  description: "Establece un fondo para tu targeta de niveles.",
  run: async (client, message, args) => {

    let back = message.attachments.first()

    if(!back) {
      return message.channel.send("<:no:863629746042961932> | No encontre ninguna imagen unida al comando ...")
    }

      db.set(`background_${message.author.id}`, back.url)
      message.channel.send(`<:yes:863629754463551499> |  Se a actualizado tu background exitosamente.`)
  }
}