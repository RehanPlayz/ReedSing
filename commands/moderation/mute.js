const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const ms = require('ms')
const moment = require("moment");
require('moment-duration-format')

module.exports = {
  name: "mute",
  description: "Silencia a cualquiera que rompa las reglas.",
  category: "moderation",
  botPermission: ['MANAGE_MESSAGES'],
  authorPermission: ['MANAGE_MESSAGES'],
  usage: "mute <@user> <reason> [time]",
  run: async (client, message, args) => {
    if (message.deletable) {
      message.delete();
  }
  
    const user = message.mentions.members.first();
    
    if(!user) {
      return message.channel.reply("<:no:863629746042961932> Mencione al miembro a quien desea silenciar").then(msg => {msg.delete({ timeout: 10000 })})
    }

    if(message.mentions.users.first().bot) {
      return message.channel.reply("<:no:863629746042961932> No puedes advertir a los bots").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.reply("<:no:863629746042961932> Idiota, ¿cómo puedes silenciar al propietario del servidor? -_-").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(user.id === message.author.id) {
      return message.channel.reply("<:no:863629746042961932> No te silenciare -_-").then(msg => {msg.delete({ timeout: 10000 })})
    }

    if(user.highestRole.position >= message.author.highestRole.position) {
      return message.channel.reply("<:no:863629746042961932> No puedes silenciar a alguien superior a ti!").then(msg => {msg.delete({ timeout: 10000 })})
    }

    let time = args[2]
    let reason = args[1];
    let mute = db.get(`muterole_${message.guild.id}`)
    let users = db.get(`userrole_${message.guild.id}`)

    if(!mute) {
      return message.channel.reply("<:no:863629746042961932> No hay rol valido para mutear use **/configuracion setup roles**").then(msg => {msg.delete({ timeout: 10000 })})
    }

    if(!users) {
      return message.channel.reply("<:no:863629746042961932> No hay rol valido de usuarios use **/configuracion setup roles**").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    if(user.roles.cache.some(role => role.id === mute)) {
      return message.channel.reply(":<:no:863629746042961932> El usuario dado ya esta silenciado.").then(msg => {msg.delete({ timeout: 10000 })})
      }

    if (!reason) {
      return message.channel.reply("<:no:863629746042961932> Dime una razon para mutear.").then(msg => {msg.delete({ timeout: 10000 })})
      }  
      const ReedSing = client.emojis.cache.find(emoji => emoji.name === "ReedSingOriginal");

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

      const embed1 = new MessageEmbed()
      .setTitle(`**__Usuario Silenciado__**`)
      .setColor('RED')
      .addFields(
        { name: 'Staff', value: `${message.author}`, inline: true },
        { name: 'Usuario', value: `${user}`, inline: true },
        { name: 'Razon', value: `${reason}`, inline: true },
      )     

      const embed2 = new MessageEmbed()
      .setTitle(`**__Fuiste Silenciado__**`)
      .setColor('RED')
      .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
      .addFields(
        { name: 'Staff', value: `${message.author}`, inline: true },
        { name: 'Razon', value: `${reason}`, inline: true },
      ) 

      const embed3 = new MessageEmbed()
      .setTitle(`**__Tu Silencio Fue Revocado__**`)
      .setColor('RED')
      .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
      .addFields(
        { name: 'Staff', value: `${message.author}`, inline: true },
        { name: 'Razon Antigua', value: `${reason}`, inline: true },
      )
  

    if (!time) {

      user.roles.remove(users)
      user.roles.add(mute)

      message.channel.send(embed1)//.then(msg => {msg.delete({ timeout: 10000 })})
      
      user.send(embed2)

      db.add(`mutecount_${message.guild.id}_${message.author.id}`, 1)
      const ChannelID = db.get(`logs`); 
      if(!ChannelID) return;
      client.channels.cache.get(ChannelID).send(embed);  
    } else { 
      user.roles.remove(users)
      user.roles.add(mute)

      let tiempo = moment.duration(ms(time)).format("D [ Dias] h[ Horas] m[ Minutos] s[ Segundos]")
      embed1.addField('Tiempo', `${tiempo}`, true)

      message.channel.send(embed1)//.then(msg => {msg.delete({ timeout: 10000 })})

      embed2.addField('Expira', `En ${tiempo}`, false)
      user.send(embed2)

      embed.addField('Expira', `En ${tiempo}`, false)
      db.add(`mutecount_${message.guild.id}_${message.author.id}`, 1)
      const ChannelID = db.get(`logs`); 
      if(!ChannelID) return;
      client.channels.cache.get(ChannelID).send(embed);  

      setTimeout( function () {
        user.roles.remove(mute)
        user.roles.add(users)
        user.send(embed3)
    }, ms(time));
      }
    }
  }

