const { MessageEmbed } = require("discord.js")
const XP = require('quick.xp');
const db = require('quick.db')
const moment = require("moment")
const flags = {
  DISCORD_EMPLOYEE: 'Discord Employee',
  DISCORD_PARTNER: 'Discord Partner',
  BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
  BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
  HYPESQUAD_EVENTS: 'HypeSquad Events',
  HOUSE_BRAVERY: 'House of Bravery',
  HOUSE_BRILLIANCE: 'House of Brilliance',
  HOUSE_BALANCE: 'House of Balance',
  EARLY_SUPPORTER: 'Early Supporter',
  TEAM_USER: 'Team User',
  SYSTEM: 'System',
  VERIFIED_BOT: 'Verified Bot',
  VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user"],
  usage: "userinfo <@user>",
  category: "info",
  description: "Obten estadísticas avanzadas de una persona determinada o de usted mismo",
  run: async (client, message, args) => {
    const xp = new XP.SQLiteManager({
      deleteMessage: false,
      cooldown: 6000,
      levelUpMessage: `¡{{user}} Subiste de nivel perra, Sr.Maus te dara Caricias x{{level}}!`,
      levelUpChannel: '836992274093178880',
  });

    let user;

    if (!args[0]) {
      user = message.member;
    } else {

      user = message.mentions.members.first() || await message.guild.members.fetch(args[0]).catch(err => {
        return message.channel.send("<:no:863629746042961932> | No se puede encontrar a esta persona")
      })
    }

    if (!user) {
      return message.channel.send("<:no:863629746042961932> | No se puede encontrar a esta persona!")
    }

    let level = xp.getLevel(message, user.id)
    if(level === NaN) level = '0'
    if(level === null) level = '0'
    if(level === undefined) level = '0'
    if(level === 0) level = '0'

    let nextlevel = level + 1
    let rxp = xp.getXP(message, user.id)
    let rexp = db.get(`previousrequired_${message.guild.id}_${message.author.id}`)
    let required = rexp + 50 * nextlevel;

    let msgcount = db.fetch(`msgcount_${message.guild.id}_${user.id}`)
    if(msgcount === NaN) msgcount = '0'
    if(msgcount === null) msgcount = '0'
    if(msgcount === undefined) msgcount = '0'
    let warns = db.fetch(`warningsg_${message.guild.id}_${user.id}`)
    if(warns === NaN) warns = '0'
    if(warns === null) warns = '0'
    if(warns === undefined) warns = '0'

    let mutes = db.fetch(`mutecount_${message.guild.id}_${message.author.id}`)
    if(mutes === NaN) mutes = '0'
    if(mutes === null) mutes = '0'
    if(mutes === undefined) mutes = '0'

    //OPTIONS FOR STATUS

    let stat = {
      online: "https://cdn.discordapp.com/emojis/851680914239914014.png?v=1",
      idle: "https://cdn.discordapp.com/emojis/851680843583455242.png?v=1",
      dnd: "https://cdn.discordapp.com/emojis/851680890063945738.png?v=1",
      offline: "https://cdn.discordapp.com/emojis/851680864555630634.png?v=1"
    }

    //NOW BADGES
      const roles = user.roles.cache.first(11)
      .sort((a, b) => b.position - a.position)
      .map(role => role.name)
      .slice(0, -1);

    let userFlags = await user.user.flags.toArray();

    let bot = ''
    if (user.user.bot) {
      bot = "Es un bot";
    } else {
      bot = "Es un humano";
    }

    let embed = new MessageEmbed()
      .setThumbnail(user.user.displayAvatarURL({
        dynamic: true
      }))
      embed.addFields(
        { name: '**➔ Username**', value: `\`\`\`${user.user.tag}\`\`\``, inline: true },
        { name: '**➔ ID**', value: `\`\`\`${user.user.id}\`\`\``, inline: true },
      )

    //EMBED COLOR BASED ON member
    embed.setColor(user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor)

    //OTHER STUFF 
    embed.addField(`**➔ Roles [${roles.length}] (Mostrando hasta 10 roles)**`, `\`\`\`${roles.length > 0 ? roles.join('\n') : roles.length < 0 ? this.client.utils.trimArray(roles) : 'Ninguno'}\`\`\``)
    embed.setAuthor(`Informacion Sobre ${user.user.username}`, `${user.user.presence.status, stat[user.user.presence.status]}`)
    embed.addFields(
      { name: '**➔ Nickname**', value: `\`\`\`${user.nickname ? `${user.nickname}` : 'No tiene'}\`\`\``, inline: true},
      { name: '**➔ Es un bot/humano**', value: `\`\`\`${bot}\`\`\``, inline: true },
    )
    embed.addField('**➔ Entro a este servidor el (Mes/Dia/Año)**', `\`\`\`${moment(user.joinedAt).format('MM/DD/YYYY LT')} (${moment(user.joinedAt).fromNow()})\`\`\``)
    embed.addField('**➔ Creo su cuenta el (Mes/Dia/Año)**', `\`\`\`${moment(user.createdTimestamp).format('MM/DD/YYYY LT')} (${moment(user.user.createdTimestamp).fromNow()})\`\`\``)
    embed.addFields(
      { name: '**➔ Veces Advertido**', value: `\`\`\`${warns}\`\`\``, inline: true},
      { name: '**➔ Veces Silenciado**', value: `\`\`\`${mutes}\`\`\``, inline: true },
    )
    embed.addField('**➔ Mensajes Enviados**', `\`\`\`${msgcount}\`\`\``)

    embed.addFields(
      { name: '**➔ Nivel**', value: `\`\`\`${level}\`\`\``, inline: true},
      { name: '**➔ Experiencia**', value: `\`\`\`${rxp}/${required}\`\`\``, inline: true },
    )


    return message.channel.send(embed).catch(err => {
      return message.channel.send("<:no:863629746042961932> | Error : " + err)
    })



  }



}