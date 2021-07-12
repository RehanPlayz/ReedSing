/**
 * Required Stuff
 */

const db = require("quick.db")
const { MessageEmbed } = require("discord.js")
const Canvas = require("discord-canvas"),
  Discord = require("discord.js");



/**
 * @param {Object} [client]
 * @param {Object} [member]
 */

module.exports.run = async (client, member) => {
  console.log('¡El usuario ' + member.user.username + ' entro al servidor!')
        
  let role = db.get(`userrole_${member.guild.id}`)
  if(!role) return;
      
  member.roles.add(role)

  const image = await new Canvas.Welcome()
  .setUsername(member.user.username)
  .setDiscriminator(member.user.discriminator)
  .setMemberCount(member.guild.memberCount)
  .setGuildName("ReedSing")
  .setAvatar(member.user.displayAvatarURL({ format: 'png' }))
  .setColor("border", "#c8ccc9")
  .setColor("username-box", "#ffffff")
  .setColor("discriminator-box", "#ffffff")
  .setColor("message-box", "#ffffff")
  .setColor("title-border", "#DC143C")
  .setColor("title", "#1e2021")
  .setColor("avatar", "#1e2021")
  .setOpacity("discriminator-box", "0.0")
  .setOpacity("username-box", "0.0")
  .setOpacity("border", "0.0")
  .setBackground("https://cdn.discordapp.com/attachments/836991665985290296/853465546448568320/aea.png")
  .toAttachment();
 
const attachment = new Discord.MessageAttachment(image.toBuffer(), "welcome-image.png");
let reglas = `https://discord.com/channels/862010134091792425/850652268981256202/`

    let msgChannel = new MessageEmbed() 
       .setAuthor(` ReedSing Network | Bienvenidas`,"https://cdn.discordapp.com/emojis/847471741516382248.png?v=1", "https://twitter.com/ReedSingNT")
       .setTitle(`¡Miembro salvaje ha aparecido!`)
       .setURL(`https://twitter.com/ReedSingNT`)
       .setThumbnail('https://cdn.mee6.xyz/guild-images/835675027693240330/00484274ad0d1de4fc853f0170cd38bbcc46391837395a518f456d86002c3515.png')
       .setDescription(`¡Bienvenido(a) ${member.user}!, Espero que te diviertas en el servidor y te la pases genial por aquí en ReedSing!, recuerda leer nuestras [reglas](${reglas}) para nunca recibir una sancion.`)
       .attachFiles(attachment)
       .setImage('attachment://welcome-image.png')
       .setFooter("play.reedsing.club - tienda.reedsing.club", 'https://cdn.discordapp.com/emojis/847471742267162624.png?v=1')
       .setColor("#219e45") 
       .setTimestamp()
       const ChannelID = db.get(`welchannel_${member.guild.id}`); 
       if(!ChannelID) return;
       client.channels.cache.get(ChannelID).send(msgChannel);
}

