const { MessageEmbed } = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@user> <reason>",
  botPermission: ['MANAGE_MESSAGES'],
  authorPermission: ['MANAGE_MESSAGES'],
  description: "Advertir a cualquiera que no obedezca las reglas.",
  run: async (client, message, args) => {
    if (message.deletable) {
      message.delete();
  }
  
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.reply("<:no:863629746042961932> | Por favor, mencione a la persona a la que desea advertir - warn @user <reason>").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.reply("<:no:863629746042961932> | No puedes advertir a los bots").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(message.author.id === user.id) {
      return message.channel.reply("<:no:863629746042961932> | No puedes advertirte a ti mismo").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.reply("<:no:863629746042961932> | Idiota, ¿cómo puedes advertir al propietario del servidor? -_-").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(user.highestRole.position >= message.author.highestRole.position) {
      return message.channel.reply("<:no:863629746042961932> | No puedes advertir a alguien superior a ti!").then(msg => {msg.delete({ timeout: 10000 })})
    }

    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.reply("<:no:863629746042961932> | Proporcione una razón para advertir.").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    let warnings = db.get(`warnings_${message.guild.id}_${message.author.id}`)
    if(warnings === undefined) warnings = 0
    if(warnings === null) warnings = 0
    if(warnings === NaN) warnings = 0

    if(warnings > 2) {
      let mute = db.get(`muterole_${message.guild.id}`)
      let users = db.get(`userrole_${message.guild.id}`)

      if(!mute) {
        return message.channel.reply("<:no:863629746042961932> | No hay rol valido para mutear use **/configuracion setup roles**").then(msg => {msg.delete({ timeout: 10000 })})
      }
  
      if(!users) {
        return message.channel.reply("<:no:863629746042961932> | No hay rol valido de usuarios use **/configuracion setup roles**").then(msg => {msg.delete({ timeout: 10000 })})
      }

      let reason = "Alcanzar el maximo de advertencias"

      const ReedSing = client.emojis.cache.find(emoji => emoji.name === "ReedSingOriginal");

      const embed2 = new MessageEmbed()
      .setTitle(`**__Fuiste Silenciado__**`)
      .setColor('RED')
      .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
      .addFields(
        { name: 'Staff', value: `${client.user.username}`, inline: true },
        { name: 'Razon', value: `${reason}`, inline: true },
      ) 
    
      const embed1 = new MessageEmbed()
      .setTitle(`**__Usuario Silenciado__**`)
      .setColor('RED')
      .addFields(
        { name: 'Staff', value: `${client.user.username}`, inline: true },
        { name: 'Usuario', value: `${user}`, inline: true },
        { name: 'Razon', value: `${reason}`, inline: true },
      ) 

      const embed = new MessageEmbed()
      .setColor("#ff0000")
      .setThumbnail(user.user.avatarURL())
      .setAuthor("[MUTE] "+user.username,"https://lh3.googleusercontent.com/proxy/yQA3PeAG-oIhXGmbzVL8h207OQTIP3k_-ig073uNGJUPzV-6P8rm9Ke3H-QX-GbLD5W9eiNyeQIXvKaS-BrNAa50vp2DKfYpEnTizHokTOYq") 
      .addFields(
          { name: "Usuario", value: user, inline: true },
          { name: 'Moderador', value: message.author, inline: true },
          { name: 'Razon', value: `${reason}`, inline: true },
      )
      .setFooter("ReedSing| Muteos")
      .setTimestamp()

      let tiempo = '∞'

      user.roles.remove(users)
      user.roles.add(mute)
      embed2.addField('Expira', `En ${tiempo}`, true)
      user.send(embed2)
      db.set(`warnings_${message.guild.id}_${message.author.id}`, 0)
      db.add(`mutecount_${message.guild.id}_${message.author.id}`, 1)
      embed.addField('Tiempo', `${tiempo}`, true)
      const ChannelID = db.get(`logs`); 
      if(!ChannelID) return;
      client.channels.cache.get(ChannelID).send(embed); 
      embed1.addField('Tiempo', `${tiempo}`, true)
      return message.channel.send(embed1)
    }
    let ad = db.fetch(`warningsg_${message.guild.id}_${user.id}`)

    const embed4 = new MessageEmbed()
    .setTitle(`**__Fuiste Advertido__**`)
    .setColor('RED')
    .addFields(
      { name: 'Staff', value: `${message.author}`, inline: true },
      { name: 'Razon', value: `${reason}`, inline: true },
    ) 
     .addField(`Advertencias Totales`, ad)

     const embed5 = new MessageEmbed()
     .setTitle(`**__Usuario Advertido__**`)
     .setColor('RED')
     .addFields(
       { name: 'Staff', value: `${message.author}`, inline: true },
       { name: 'Usuario', value: `${user}`, inline: true },
       { name: 'Razon', value: `${reason}`, inline: true },
    ) 

    const embed = new MessageEmbed()
    .setColor("#ff0000")
    .setThumbnail(toBan.user.avatarURL())
    .setAuthor("[WARN] "+user.username,"http://pa1.narvii.com/6884/893d63465f58084348ffb67d55ca80a248439c68r1-291-270_00.gif") 
    .addFields(
        { name: "Usuario", value: user, inline: true },
        { name: 'Moderador', value: message.author, inline: true },
        { name: 'Razon', value: `${reason}`, inline: true },
    )
    .setFooter("ReedSing| Muteos")
    .setTimestamp()


      db.add(`warnings_${message.guild.id}_${user.id}`, 1)
      db.add(`warningsg_${message.guild.id}_${user.id}`, 1)
      user.send(embed4)
      message.channel.send(embed5)
      const ChannelID = db.get(`logs`); 
      if(!ChannelID) return;
      client.channels.cache.get(ChannelID).send(embed);  
    
  
  } 
}