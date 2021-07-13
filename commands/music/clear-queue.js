const db = require('quick.db')
module.exports = {
    name: 'clear-queue',
    aliases: ['cq'],
    description: "Limpia la queue.",
    category: 'Music',
    usage: 'clear-queue',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - No estamos en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} No hay musica actualmente en reproduccion!`);

        if (client.player.getQueue(message).tracks.length <= 1) return message.channel.send(`${client.emotes.error} Solo hay una cancion en la queue!`);

        client.player.clearQueue(message);
        db.delete(`queue`)
        message.channel.send(`${client.emotes.success} - La queue ha sido **removida**!`);
    },
};