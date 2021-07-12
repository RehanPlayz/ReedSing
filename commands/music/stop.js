const db = require('quick.db')
module.exports = {
    name: 'stop',
    aliases: ['dc'],
    category: 'Music',
    usage: 'stop',
    description: "Para la queue.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - Tu no estas en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No hay musica actualmente en reproduccion`);

        client.player.setRepeatMode(message, false);
        const success = client.player.stop(message);
        db.delete(`queue`)
        if (success) message.channel.send(`${client.emotes.success} - Musica **parada** en el servidor!`);
    },
};