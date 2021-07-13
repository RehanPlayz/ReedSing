const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
const Discord = require("discord.js");
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../function");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Expulsa al que rompa las reglas",
    botPermission: ['KICK_MEMBERS'],
    authorPermission: ['KICK_MEMBERS'],
    usage: "kick <@user> <reason>",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }
        
        const ReedSing = client.emojis.cache.find(emoji => emoji.name === "ReedSingOriginal");


        // No args
        if (!args[0]) {
            return message.reply("<:no:863629746042961932> | Proporcione una persona para kickear.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        // No reason
        if (!args[1]) {
            return message.reply("<:no:863629746042961932> | Proporcione una razón para kickear.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toKick) {
            return message.reply("<:no:863629746042961932> | No se pudo encontrar a ese miembro. Vuelve a intentarlo.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.reply("<:no:863629746042961932> | No puedes kickearte ...")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.reply("<:no:863629746042961932> | No puedo kickear a esa persona debido a la jerarquía de roles.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }
                
        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toKick.user.avatarURL())
            .setAuthor("[KICK] "+toKick.user.username,"https://i.pinimg.com/originals/a1/1f/a3/a11fa3cdbfd567f934b6c0151c6a6d8b.gif") 
            .addFields(
                { name: "Usuario", value: toKick, inline: true },
                { name: 'Moderador', value: message.member, inline: true },
                { name: 'Razon', value: args.slice(1).join(" "), inline: true },
            )
            .setFooter("ReedSing | Kickeos")
            .setTimestamp()

            const embed1 = new MessageEmbed()
            .setTitle(`**__Usuario Expulsado__**`)
            .setColor('RED')
            .addFields(
              { name: 'Staff', value: `${message.author}`, inline: true },
              { name: 'Usuario', value: `${toKick}`, inline: true },
              { name: 'Razon', value: args.slice(1).join(" "), inline: true },
            )     
      
            const embed2 = new MessageEmbed()
            .setTitle(`**__Fuiste Expulsado__**`)
            .setColor('RED')
            .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
            .addFields(
              { name: 'Staff', value: `${message.author}`, inline: true },
              { name: 'Razon', value: args.slice(1).join(" "), inline: true },
            ) 

        const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Esta verificación deja de ser válida después de 30 segundos.`)
            .setDescription(`Quieres kickear ${toKick}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reaction collector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // The verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`<:no:863629746042961932> | Bueno ... el kick no funcionó. Aquí está el error ${err}`)
                    });

                    const ChannelID = db.get(`logs`); 
                    if(!ChannelID) return;
                    client.channels.cache.get(ChannelID).send(embed);   
                    message.channel.send(embed1)
                    toKick.send(embed2) 
                } else if (emoji === "❌") {
                msg.delete();

                message.reply(`<:no:863629746042961932> | Kick cancelado.`)
                .then(msg => {msg.delete({ timeout: 10000 })})
            }
        });
    }
};