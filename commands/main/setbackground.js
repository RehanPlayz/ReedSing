const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setbackground",
  category: "main",
  aliases: ["setback"],
  usage: "setbackground <URL>",
  description: "Establece un fondo para tu targeta de niveles.",
  run: async (client, message, args) => {

    let back = args.slice(0).join(" ")

    if(!back) {
      return message.channel.send("Dime la URL de tu nuevo background. \nNo olvides que debe ser de https://w.wallhaven.cc")
    }

    let urle = /((?:https?:)?\/\/)?w.wallhaven.cc\/full\/\w*\d*\/wallhaven-\w*\d*.jpg/;
    let result = urle.test(back)
    console.log(result)

    if(!result) {
      return message.channel.send(`La URL de tu background debe ser de wallhaven. \nEjemplo \`https://w.wallhaven.cc/full/6o/wallhaven-6od3px.jpg\` `)
    } else {
      db.set(`background_${message.author.id}`, back)
      message.channel.send(`Se a actualizado tu background exitosamente.`)
    }
  }
}