const db = require('quick.db')
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "unmute",
  usage: "unmute <@user>",
  botPermission: ['MANAGE_MESSAGES'],
  authorPermission: ['MANAGE_MESSAGES'],
  description: "Quitara el silenciado al usuario mencionado.",
  category: "moderation",
  run: async (client, message, args) => {
    if (message.deletable) {
      message.delete();
  }
  

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("No tengo permiso para administrar roles.").then(msg => {msg.delete({ timeout: 10000 })})
    }

    const user = message.mentions.members.first();

    if (!user) {
      return message.channel.reply("<:no:863629746042961932> Mencione al miembro al que desea dejar de silenciar.").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    let mute = db.get(`muterole_${message.guild.id}`)
    let users = db.get(`userrole_${message.guild.id}`)

    if(!mute) {
      return message.channel.reply("<:no:863629746042961932> No hay rol valido para mutear use **/configuracion setup roles**").then(msg => {msg.delete({ timeout: 10000 })})
    }

    if(!users) {
      return message.channel.reply("<:no:863629746042961932> No hay rol valido de usuarios use **/configuracion setup roles**").then(msg => {msg.delete({ timeout: 10000 })})
    }
    
 if(!user.roles.cache.some(role => role.id === mute)) {
      return message.channel.reply("<:no:863629746042961932> Dado que el usuario no tiene un rol Silencio, ¿qué se supone que debo tomar?").then(msg => {msg.delete({ timeout: 10000 })})
    } else { 
    
    user.roles.remove(mute)
    user.roles.add(users)
    const ReedSing = client.emojis.cache.find(emoji => emoji.name === "ReedSingOriginal");

    const embed1 = new MessageEmbed()
    .setTitle(`**__Silencio Revocado__**`)
    .setColor('RED')
    .addFields(
      { name: 'Staff', value: `${message.author}`, inline: true },
      { name: 'Usuario', value: `${user}`, inline: true },
    )  
    
    message.channel.send(embed1)

    const embed3 = new MessageEmbed()
    .setTitle(`**__Tu Silencio Fue Revocado__**`)
    .setColor('RED')
    .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
    .addFields(
      { name: 'Staff', value: `${message.author}`, inline: true },
      { name: 'Lee las reglas.', value: `Se te removio el silencio, recomendamos leer <#850652268981256202>`, inline: true },
    )

    user.send(embed3)

    const embed = new MessageEmbed()
    .setColor("#ff0000")
    .setThumbnail(user.user.avatarURL())
    .setAuthor("[UNMUTE] "+user.username,"https://lh3.googleusercontent.com/proxy/yQA3PeAG-oIhXGmbzVL8h207OQTIP3k_-ig073uNGJUPzV-6P8rm9Ke3H-QX-GbLD5W9eiNyeQIXvKaS-BrNAa50vp2DKfYpEnTizHokTOYq") 
    .addFields(
        { name: "Usuario", value: user, inline: true },
        { name: 'Moderador', value: message.author, inline: true },
    )
    .setFooter("ReedSing| Muteos")
    .setTimestamp()

    const ChannelID = db.get(`logs`); 
    if(!ChannelID) return;
    client.channels.cache.get(ChannelID).send(embed);  
     }
  }
};
