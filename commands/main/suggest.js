const { MessageEmbed } = require("discord.js")
const db = require('quick.db')

module.exports = {
  name: "sugiero",
  usage: "sugiero <message>",
  aliases: ["sug"],
  description: "Envia una sugerencia la cual ayudara al Servidor!",
  category: "main",
  run: async (client, message, args) => {
    
    const suggest = args.slice(0).join(" ")

    if(!suggest) {
      return message.channel.send("Por favor dime cual sera tu sugerencia.")
    }
    
    let canal = db.fetch(`suggestions_${message.guild.id}`)
    
    if(canal === null) {
      return message.channel.send("No existe algun canal para recibir tu sugerencia.")
    }                             

    let id1 = await db.fetch(`sugerencia_${message.guild.id}_ids.idglobal`) 
    if(id1 === NaN) id1 = 0
    if(id1 === null) id1 = 0
    if(id1 === undefined) id1 = 0

    let idfinal = id1 + 1;

          let au = message.author // Definición opcional de un usuario, en mi caso lo uso para no provocar errores
          let ca = client.channels.cache.get(canal) // Definición opcional de un canal, en mi caso lo uso para no provocar errores

            const embed = new MessageEmbed()
                .setTitle(`**__Nueva Sugerencia__**`,"https://cdn.discordapp.com/attachments/630907060829290567/845682624319717386/Neutro.png")
                .setDescription(suggest)
                .setColor("#4073FF")
                .setTimestamp()
                .setFooter(`ID: #${idfinal} • Ejecutado por ${au.username}`, message.author.displayAvatarURL({ dynamic: true, size: 1024 }))                 
                ca.send(embed)
                .then((message) => {
                message.react('👍').then(() => { message.react('👎')})
                db.set(`sugerencia_${idfinal}`, { tag: au.username, userid: au.id, msgid: ca.lastMessageID, sug: suggest, a: message.author }) 
                db.set(`sugerencia_${message.guild.id}_ids.idglobal`, idfinal)
              })

    let url = `https://discord.com/channels/862010134091792425/${canal}/`
    const hecho = new MessageEmbed()
      .setDescription(`${message.author}, Hey revisa tu sugerencia aqui, [¡Por aca!](${url})`)
      
    message.channel.send(hecho).catch(err => {})
    
  }
}