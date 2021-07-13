const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    category: 'Music',
    usage: 'nowplaying',
    description: "Revisa cual es la cancion en reproduccion.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} No estamos en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} No hay musica actualmente en reproduccion!`);

        const track = client.player.nowPlaying(message);
        const filters = [];

        Object.keys(client.player.getQueue(message).filters).forEach((filterName) => client.player.getQueue(message).filters[filterName]) ? filters.push(filterName) : false;

        message.channel.send(new MessageEmbed()
        .setAuthor(`Reproduccion Actual ♪`, 'https://cdn.discordapp.com/emojis/862716833172553739.png?v=1', `${track.url}`)
        .setColor('YELLOW')
        .setDescription(`[${track.title}](${track.url})\n\n**\`${client.player.createProgressBar(message, { timecodes: true })}\`**\n\n**\`Una petición de:\`** ${track.requestedBy.tag}`)
        .setThumbnail(track.thumbnail))
    }
};