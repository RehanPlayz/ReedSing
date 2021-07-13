module.exports = {
    name: 'resume',
    aliases: [],
    category: 'Music',
    usage: 'resume',
    description: "Renauda la queue, debe de haber estado pausada para que sirvas.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} No estamos en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} No hay musica actualmente en reproduccion!`);

        if (!client.player.getQueue(message).paused) return message.channel.send(`${client.emotes.error} La cancion no esta pausada!`);

        const success = client.player.resume(message);

        if (success) message.channel.send(`${client.emotes.success} Renaudando :thumbsup:`);
    },
};