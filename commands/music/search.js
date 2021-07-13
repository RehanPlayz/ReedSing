module.exports = {
    name: 'search',
    aliases: ['sr'],
    category: 'Music',
    usage: 'search [titulo/URL]',
    description: "Busca canciones cercanas al titulo u URL.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} No estamos en el mismo canal de voz!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} Por favor indica el titulo de una cancion!`);

        client.player.play(message, args.join(" "));
    },
};