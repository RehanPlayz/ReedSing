const db = require("quick.db")
const ms = require('ms')
const moment = require("moment");
require('moment-duration-format')
const XP = require('quick.xp');
const {MessageEmbed} = require('discord.js')
const config = require('../config/config');
const { badwords } = require("../data.json") 
let cooldown = {}

module.exports.run = async (client, message, options) => {
  addexp(message); //Add XP to the user profile

  // Anti-BadWords & URL
  if (message.author.bot) return;
  if(!message.member.hasPermission("ADMINISTRATOR")) {
    if(is_url(message.content)) {
      const embedur = new MessageEmbed()
      .setAuthor(`${message.author.tag} ha sido advertido`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Razón:** Mandar URL's`)
      let urle = /((?:https?:)?\/\/)?w.wallhaven.cc\/full\/\w*\d*\/wallhaven-\w*\d*.jpg/;
      let result = urle.test(message.content)
      if(result) return;  
      db.add(`warnings_${message.guild.id}_${message.author.id}`, 1)
      db.add(`warningsg_${message.guild.id}_${message.author.id}`, 1)
      message.delete()
      message.channel.send(embedur).then(msg => {msg.delete({ timeout: 10000 })})
    } else if(is_swear(message.content)) {
      const embedbad = new MessageEmbed()
      .setAuthor(`${message.author.tag} ha sido advertido`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`**Razón:** Uso de malas palabras`)
      db.add(`warnings_${message.guild.id}_${message.author.id}`, 1)
      db.add(`warningsg_${message.guild.id}_${message.author.id}`, 1)
      message.delete()
      message.channel.send(embedbad).then(msg => {msg.delete({ timeout: 10000 })})
    }
  }  

// Messages-Count
db.add(`msgcount_${message.guild.id}_${message.author.id}`, 1)

// Mute cuando hay 3 warns
let warnings = db.get(`warnings_${message.guild.id}_${message.author.id}`)
if(warnings === undefined) warnings = 0
if(warnings === null) warnings = 0
if(warnings === NaN) warnings = 0
    
if(warnings > 2) {
  let mute = db.get(`muterole_${message.guild.id}`)
  let users = db.get(`userrole_${message.guild.id}`)
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
    { name: 'Usuario', value: `${message.author}`, inline: true },
    { name: 'Razon', value: `${reason}`, inline: true },
  ) 

  const embed3 = new MessageEmbed()
  .setTitle(`**__Tu Silencio Fue Revocado__**`)
  .setColor('RED')
  .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
  .addFields(
    { name: 'Staff', value: `${client.user.username}`, inline: true },
    { name: 'Razon Antigua', value: `${reason}`, inline: true },
  )

  const embed = new MessageEmbed()
  .setColor("#ff0000")
  .setThumbnail(message.author.avatarURL())
  .setAuthor("[MUTE] "+message.author.username,"https://lh3.googleusercontent.com/proxy/yQA3PeAG-oIhXGmbzVL8h207OQTIP3k_-ig073uNGJUPzV-6P8rm9Ke3H-QX-GbLD5W9eiNyeQIXvKaS-BrNAa50vp2DKfYpEnTizHokTOYq") 
  .addFields(
      { name: "Usuario", value: message.author, inline: true },
      { name: 'Moderador', value: client.user.username, inline: true },
      { name: 'Razon', value: `${reason}`, inline: true },
  )
  .setFooter("ReedSing| Muteos")
  .setTimestamp()

  message.member.roles.remove(users)
  message.member.roles.add(mute)
  let tiempo = moment.duration(ms('10m')).format("D [ Dias] h[ Horas] m[ Minutos] s[ Segundos]")
  embed2.addField('Expira', `En ${tiempo}`, true)
  message.author.send(embed2)
  embed1.addField('Tiempo', `${tiempo}`, true)
  message.channel.send(embed1)
  const ChannelID = db.get(`logs`); 
  if(!ChannelID) return;
  client.channels.cache.get(ChannelID).send(embed);  
  db.set(`warnings_${message.guild.id}_${message.author.id}`, 0)
  db.add(`mutecount_${message.guild.id}_${message.author.id}`, 1)
  setTimeout( function () {
    message.member.roles.remove(mute)
    message.member.roles.add(users)
    message.author.send(`${embed3}`)
}, ms('2m')) 
return
}

// AFK-System
if(db.has(`afk_${message.guild.id}_${message.author.id}`)) { 
  const oldReason = db.get(`afk_${message.guild.id}_${message.author.id}`)  
  await db.delete(`afk_${message.guild.id}_${message.author.id}`) 
  message.channel.send(`Oh ${message.author}, ya volviste de tu **Ausencia**. \nEstuviste afuera por **${oldReason}**.`) 
}

  if(message.mentions.members.first()) { // if someone mentioned the person
    if (message.content.includes('@here') || message.content.includes('@everyone')) return;
    if (message.author.bot) return;
    if(db.has(`afk_${message.guild.id}_${message.mentions.members.first().id}`)) { // db will check if he is afk
        message.channel.send(message.mentions.members.first().user.tag + " esta **Ausente** : " + db.get(`afk_${message.guild.id}_${message.mentions.members.first().id}`)) // if yes, it gets from the db the afk msg and send it
    }
 }

// Level-System
function addexp(message) {
  let lvl = db.get(`levelchannel_${message.guild.id}`)
  let channel = client.channels.cache.get(lvl)
  const xp = new XP.SQLiteManager({ 
    deleteMessage: true,
    cooldown: 10000,
    levelUpMessage: `¡${message.author} Subiste de nivel, Reed te dara Caricias x{{level}}!`,
    levelUpChannel: `${channel}`,
  })

  let prefix = "f!"
  if (message.content.startsWith(prefix)) return;
  if (message.author.bot) return;
  let toadd = Math.floor(Math.random() * 3 + 3);
  xp.giveXP(message);
  }
  

// Commands 
  let prefix = db.get(`prefix_${message.guild.id}`);
  if (prefix === null) prefix = config.discord.default_prefix;
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.members.fetch(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;
  let cmdx = db.get(`cmd_${message.guild.id}`)
  if (cmdx) {
    let cmdy = cmdx.find(x => x.name === cmd)
    if (cmdy) message.channel.send(cmdy.responce)
  }

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

   /* P E R M I S S I O N S */
  if (command.botPermission) {
    const Permissions = command.botPermission.filter(x => !message.guild.me.hasPermission(x)).map(x => "`" + x + "`")
    if (Permissions.length) return message.channel.send(`<:no:863629746042961932> | Yo nesecito ${Permissions.join(", ")} permiso(s) para ejecutar el comando!`)
  } 
  
  if (command.authorPermission) {
    const Permissions = command.authorPermission.filter(x => !message.member.hasPermission(x)).map(x => "`" + x + "`")
    if (Permissions.length) return message.channel.send(`<:no:863629746042961932> | Tu nesesitas ${Permissions.join(", ")} permiso(s) para ejecutar el comando!`)
  }

  /* O W N E R */
  if (command.ownerOnly) {
    if (message.author.id !== config.discord.ownerID) return message.channel.send("<:no:863629746042961932> | El comando es solo para mi dueño.")
  }

  /* C O O L - D O W N */
  let uCooldown = cooldown[message.author.id];
  if (!uCooldown) {
    cooldown[message.author.id] = {}
    uCooldown = cooldown[message.author.id]
  }

  let time = uCooldown[command.name] || 0
  if (time && (time > Date.now())) return message.channel.send(`<:no:863629746042961932> | Tu puedes volver a usar el comando en ${Math.ceil((time - Date.now()) / 1000)} segundo(s)`) 
  cooldown[message.author.id][command.name] = Date.now() + command.cooldown;

  if (command) command.run(client, message, args);
}


//-------------------------------------------- F U N C T I O N ------------------------------------------
function is_url(str) {
return /(https|http):\/\/[\S]+/gi.test(str) ? true : false
}

function is_swear(string) {
  return new RegExp(`\\b(?:${badwords.join("|")})\\b`, "gi").test(string) ? true : false
}
