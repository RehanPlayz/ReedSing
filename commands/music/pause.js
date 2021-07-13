module.exports = {
    name: 'pause',
    aliases: [],
    category: 'Music',
    usage: 'pause',
    description: "Pausa la queue.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} No estamos en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} No hay musica actualmente en reproduccion!`);

        if (client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} La musica ya esta pausada!`);

        const success = client.player.pause(message);

        if (success) message.channel.send(`${client.emotes.success} Musica pausada!`);
    },
};