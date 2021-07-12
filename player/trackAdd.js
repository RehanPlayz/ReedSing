const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = (client, message, queue, track) => {

    const embed = new MessageEmbed()
    .setAuthor(`Añadida a la queue`, track.requestedBy.displayAvatarURL({ dynamic: true }))
    .setTitle(`${track.title}`)
    .setURL(track.url)
    .addFields(
        { name: 'Canal', value: `${track.author}`, inline: true },
        { name: 'Visitas', value: `${track.views}`, inline: true },
        { name: 'Duracion', value: `${track.duration}`, inline: true },
    )
    .setThumbnail(`${track.thumbnail}`) 
    message.channel.send(`**:mag_right: Buscando ** \`${track.title}\``);
    db.set(`queue`, `si`)
    message.channel.send(embed);
};