const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'queue',
    aliases: [],
    category: 'Music',
    usage: 'queue',
    description: "Revisa la queue actual.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} No estamos en el mismo canal de voz!`);

        const queue = client.player.getQueue(message);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} No hay canciones actualmente en reproduccion!`);
        let loopc = `` 
        let loopq = ``
    
        if (client.player.getQueue(message).repeatMode) {
            loopc = `✅`
        } else {
            loopc = `❌`
        }
        
        if (client.player.getQueue(message).loopMode) {
            loopq = `✅`
        } else {
            loopq = `❌`
        }

        message.channel.send(new MessageEmbed()
        .setTitle(`Queue para ${message.guild.name}`)
        .setFooter(`Loop: ${loopc} | Queue Loop: ${loopq}`)
        .setDescription(`__Reproduciendo ahora:__\n [${queue.playing.title}](${queue.playing.url}) | \`${queue.playing.duration} Pedido Por: ${queue.playing.requestedBy.username}\`\n\n` + `__Siguientes Canciones:__\n` + (queue.tracks.map((track, i) => { return `**__\`#${i + 1}\`__** - [${track.title}](${track.url}) | \`${track.duration} Pedido por: ${track.requestedBy.username}\``}).slice(0, 5).join('\n\n') + `\n\n${queue.tracks.length > 5 ? `y **${queue.tracks.length - 5}** otras canciones ...` : `Hay en la queue **${queue.tracks.length}** cancion(es) ...`}`)))
    },
};