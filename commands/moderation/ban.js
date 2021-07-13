  
const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require('quick.db')
const { stripIndents } = require("common-tags");
const { promptMessage } = require("../../function");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Banea al que inclumpla las reglas",
    botPermission: ['BAN_MEMBERS'],
    authorPermission: ['BAN_MEMBERS'],
    usage: "ban <@user> <reason>",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        const ReedSing = client.emojis.cache.find(emoji => emoji.name === "ReedSingOriginal");


        // No args
        if (!args[0]) {
            return message.reply("<:no:863629746042961932> | Proporcione una persona para banear.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        // No reason
        if (!args[1]) {
            return message.reply("<:no:863629746042961932> | Proporcione una razón para banear.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply("<:no:863629746042961932> | No se pudo encontrar a ese miembro. Vuelve a intentarlo.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("<:no:863629746042961932> | No puedes banearte ...")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("<:no:863629746042961932> | No puedo prohibir a esa persona debido a la jerarquía de roles.")
            .then(msg => {msg.delete({ timeout: 10000 })})
        }
        
        const embed = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(toBan.user.avatarURL())
            .setAuthor("[BAN] "+toBan.user.username,"https://i.pinimg.com/originals/a1/1f/a3/a11fa3cdbfd567f934b6c0151c6a6d8b.gif") 
            .addFields(
                { name: "Usuario", value: toBan, inline: true },
                { name: 'Moderador', value: message.member, inline: true },
                { name: 'Razon', value: args.slice(1).join(" "), inline: true },
            )
            .setFooter("ReedSing| Baneos")
            .setTimestamp()

            const embed1 = new MessageEmbed()
            .setTitle(`**__Usuario Baneado__**`)
            .setColor('RED')
            .addFields(
              { name: 'Staff', value: `${message.author}`, inline: true },
              { name: 'Usuario', value: `${toBan}`, inline: true },
              { name: 'Razon', value: args.slice(1).join(" "), inline: true },
            )     
      
            const embed2 = new MessageEmbed()
            .setTitle(`**__Fuiste Baneado__**`)
            .setColor('RED')
            .addField(`Servidor`, `${ReedSing} **ReedSing | [@ReedSingNT](https://twitter.com/ReedSingNT)**`)
            .addFields(
              { name: 'Staff', value: `${message.author}`, inline: true },
              { name: 'Razon', value: args.slice(1).join(" "), inline: true },
            ) 

        const promptEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`Esta verificación deja de ser válida después de 30 segundos.`)
            .setDescription(`Quieres banear a ${toBan}?`)

        // Send the message
        await message.channel.send(promptEmbed).then(async msg => {
            // Await the reactions and the reactioncollector
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            // Verification stuffs
            if (emoji === "✅") {
                msg.delete();

                toBan.ban({ reason: args.slice(1).join(" ") })
                    .catch(err => {
                        if (err) return message.channel.send(`<:no:863629746042961932> | Bueno ... el ban no funcionó. Aquí está el error ${err}`)
                    });

                    const ChannelID = db.get(`logs`); 
                    if(!ChannelID) return;
                    client.channels.cache.get(ChannelID).send(embed);   
                    message.channel.send(embed1)
                    toBan.send(embed2)         
                } else if (emoji === "❌") {
                msg.delete();

                message.reply(`<:no:863629746042961932> | El ban fue cancelado`)
                .then(msg => {msg.delete({ timeout: 10000 })})
            }
        });
    }
};
