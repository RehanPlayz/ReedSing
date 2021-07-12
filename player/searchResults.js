const { MessageEmbed } = require("discord.js");

module.exports = (client, message, query, tracks) => {
    const embed = new MessageEmbed()
    .setAuthor(`Estos son los resultados de su búsqueda de ${query}`)
    .setColor('GRAY')
    .setDescription(`${tracks.map((t, i) => `**__\`${i + 1}\`__** - [${t.title}](${t.url}) **\`${t.duration}\`**`).join('\n\n')}`)

    message.channel.send(embed)
};