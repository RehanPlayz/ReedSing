const db = require("quick.db")
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  botPermission: ['MANAGE_MESSAGES'],
  authorPermission: ['MANAGE_MESSAGES'],
  usage: "rwarns <@user>",
  category: "moderation",
  description: "Restablece advertencias de la persona mencionada.",
  run: async (client, message, args) => {
    if (message.deletable) {
      message.delete();
  }
  
    
    const user = message.mentions.members.first()
    
    if(!user) {
    return message.channel.send("<:no:863629746042961932> | Mencione a la persona cuya advertencia desea restablecer.").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("<:no:863629746042961932> | Los bots no pueden tener advertencias").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("<:no:863629746042961932> | No tiene permitido restablecer sus advertencias.").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    let ad = db.fetch(`warningsg_${message.guild.id}_${user.id}`)

    if(ad === null) {
      return message.channel.send(`<:no:863629746042961932> | ${message.mentions.users.first().username} no tienen ninguna advertencia.`).then(msg => {msg.delete({ timeout: 10000 })})
    }

    if(warnings === null) {
      return message.channel.send(`<:no:863629746042961932> | ${message.mentions.users.first().username} no tienen ninguna advertencia actual.`).then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    const ReedSing = client.emojis.cache.find(emoji => emoji.name === "ReedSingOriginal");

    const embed1 = new MessageEmbed()
    .setTitle(`**__Advertencias Reiniciadas__**`)
    .setColor('RED')
    .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
    .addFields(
      { name: 'Staff', value: `${message.author}`, inline: true },
      { name: 'Ad Totales Reiniciadas', value: `${ad}`, inline: true },
      { name: 'Ad Anteriores Reiniciadas', value: `${warnings}`, inline: true },
    )  
    
    const embed2 = new MessageEmbed()
    .setTitle(`**__Advertencias Reiniciadas__**`)
    .setColor('RED')
    .addFields(
      { name: 'Staff', value: `${message.author}`, inline: true },
      { name: 'Usuario.', value: `${user}`, inline: true },
    )

    const embed = new MessageEmbed()
    .setColor("#ff0000")
    .setThumbnail(toBan.user.avatarURL())
    .setAuthor("[UNWARN] "+user.username,"http://pa1.narvii.com/6884/893d63465f58084348ffb67d55ca80a248439c68r1-291-270_00.gif") 
    .addFields(
        { name: "Usuario", value: user, inline: true },
        { name: 'Moderador', value: message.author, inline: true },
        { name: 'Ad Totales Reiniciadas', value: `${ad}`, inline: true },
    )
    .addField(`Ad Anteriores Reiniciadas`, `${warnings}`, true)
    .setFooter("ReedSing| Muteos")
    .setTimestamp()

    db.delete(`warnings_${message.guild.id}_${user.id}`)
    db.delete(`warningsg_${message.guild.id}_${user.id}`)
    user.send(embed1)
    message.channel.send(embed2)
    const ChannelID = db.get(`logs`); 
    if(!ChannelID) return;
    client.channels.cache.get(ChannelID).send(embed);  
    
}
}