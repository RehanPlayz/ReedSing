const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "clear",
    aliases: ["purge", "nuke"],
    category: "moderation",
    description: "Limpia el chat.",
    botPermission: ['MANAGE_MESSAGES'],
    authorPermission: ['MANAGE_MESSAGES'],
    usage: "clear <100>",
    run: async (client, message, args) => {
        if (message.deletable) {
            message.delete();
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("Yeah, Algun Numero?.").then(msg => {msg.delete({ timeout: 10000 })})
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(new MessageEmbed()
            .setTitle(`**__Chat Limpiado__**`)
            .setColor('RED')
            .addField(`Mensajes Eliminados`, `${deleted.size}`)))
            .catch(err => message.reply(`Hee algo paso ... ${err}`));
    }
}