const {MessageEmbed} = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "noticias",
  category: "administration",
  usage: "noticias <Normal/Spoiler/Rules/Updates> <Texto> [Adjuntar Imagen]",
  description: "Manda una noticia a los miembros del servidor.",
  botPermission: ['MANAGE_MESSAGES'],
  authorPermission: ['MANAGE_MESSAGES'],
  run: async (client, message, args) => {

    let spoiler = db.fetch(`spoilerschannel_${message.guild.id}`)
    let updates = db.fetch(`updateschannel_${message.guild.id}`)
    let rules = db.fetch(`ruleschannel_${message.guild.id}`)
    let notice = db.fetch(`noticechannel_${message.guild.id}`)

    let val1 = JSON.parse('["normal"]') 
    let val2 = JSON.parse('["spoiler"]')
    let val3 = JSON.parse('["rules"]')
    let val4 = JSON.parse('["updates"]')

    let valores = JSON.parse('["normal", "spoiler", "rules", "updates"]')
    const accion = args[0]
    if (new RegExp(`\\b(?:${valores.join("|")})\\b`, "gi").test(accion) ? true : false){

      const texto = args.slice(1).join(" ")
      if (!texto){
        return message.channel.send("<:no:863629746042961932> No hay texto valido por favor reintente el comando!").then(msg => {msg.delete({ timeout: 10000 })})
      }
                if (new RegExp(`\\b(?:${val1.join("|")})\\b`, "gi").test(accion) ? true : false) {
                  if(!notice) return message.reply("No hay algun canal de Noticias, use /configuracion setup canales.").then(msg => {msg.delete({ timeout: 10000 })})
                  let ca = client.channels.cache.get(notice) 
  
                  if(message.attachments.first() ? true : false) {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Anuncios | ReedSing`,"https://cdn.discordapp.com/emojis/806356967144554566.gif?v=1")
                    .setColor('#DC143C')
                    .setDescription(texto)
                    .setImage(message.attachments.first().url)
                    .setTimestamp(Date.now())
                    .setFooter(`Anuncio Por: ${message.author.username}`, client.user.avatarURL())) 
                  } else {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Anuncios | ReedSing`,"https://cdn.discordapp.com/emojis/806356967144554566.gif?v=1")
                    .setColor('#DC143C')
                    .setDescription(texto)
                    .setTimestamp(Date.now())
                    .setFooter(`Anuncio Por: ${message.author.username}`, client.user.avatarURL())) 
                  }
                }      
        
                if (new RegExp(`\\b(?:${val2.join("|")})\\b`, "gi").test(accion) ? true : false) {
                  if(!spoiler) return message.reply("No hay algun canal de Spoilers, use /configuracion setup canales.").then(msg => {msg.delete({ timeout: 10000 })})
                  let ca = client.channels.cache.get(spoiler) 
  
                  if(message.attachments.first() ? true : false) {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Spoiler | ReedSing`,"https://emoji.gg/assets/emoji/eyesshaking.gif")
                    .setColor('#fec61b')
                    .setDescription(texto)
                    .setImage(message.attachments.first().url)
                    .setTimestamp(Date.now())                
                    .setFooter(`Spoiler Por: ${message.author.username}`, client.user.avatarURL()))
                  } else {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Spoiler | ReedSing`,"https://emoji.gg/assets/emoji/eyesshaking.gif")
                    .setColor('#fec61b')
                    .setDescription(texto)
                    .setTimestamp(Date.now())                
                    .setFooter(`Spoiler Por: ${message.author.username}`, client.user.avatarURL()))
                  }
                }
  
                if (new RegExp(`\\b(?:${val3.join("|")})\\b`, "gi").test(accion) ? true : false) {
                  if(!rules) return message.reply("No hay algun canal de Reglas, use /configuracion setup canales.").then(msg => {msg.delete({ timeout: 10000 })})
                  let ca = client.channels.cache.get(rules) 
                  
                  if(message.attachments.first() ? true : false) {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Reglas | ReedSing`,"https://img.icons8.com/clouds/2x/law-book.png")
                    .setColor('#B22222')
                    .setDescription(texto)
                    .setImage(message.attachments.first().url)
                    .setTimestamp(Date.now())
                    .setFooter(`Anuncio Por: ${message.author.username}`, client.user.avatarURL())) 
                  } else {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Reglas | ReedSing`,"https://img.icons8.com/clouds/2x/law-book.png")
                    .setColor('#B22222')
                    .setDescription(texto)
                    .setTimestamp(Date.now())
                    .setFooter(`Anuncio Por: ${message.author.username}`, client.user.avatarURL())) 
                  }
                }   
                
                if (new RegExp(`\\b(?:${val4.join("|")})\\b`, "gi").test(accion) ? true : false) {
                  if(!updates) return message.reply("No hay algun canal de Actualizaciones, use /configuracion setup canales.").then(msg => {msg.delete({ timeout: 10000 })})
                  let ca = client.channels.cache.get(updates) 
  
                  if(message.attachments.first() ? true : false) {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Actualizaciones | ReedSing`,"https://edubois.files.wordpress.com/2015/04/upgradecanisteranimation256_test.gif")
                    .setColor('#32CD32')
                    .setDescription(texto)
                    .setImage(message.attachments.first().url)
                    .setTimestamp(Date.now())
                    .setFooter(`Anuncio Por: ${message.author.username}`, client.user.avatarURL())) 
                  } else {
                    const hecho = new MessageEmbed()
                    .setDescription(`El anuncio tipo **__${accion}__** fue anunciado correctamente.`)
                    message.reply("", { embed: hecho})
                    return ca.send(new MessageEmbed()
                    .setAuthor(`Actualizaciones | ReedSing`,"https://edubois.files.wordpress.com/2015/04/upgradecanisteranimation256_test.gif")
                    .setColor('#32CD32')
                    .setDescription(texto)
                    .setTimestamp(Date.now())
                    .setFooter(`Anuncio Por: ${message.author.username}`, client.user.avatarURL())) 
                    }
                  }
    } else {
      return message.channel.send("<:no:863629746042961932> No pusiste una opcion valida, las opciones son **\`Normal/Spoiler/Rules/Updates\`**!").then(msg => {msg.delete({ timeout: 10000 })})
    }
  }
}
