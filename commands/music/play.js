const db = require('quick.db')
module.exports = {
    name: 'play',
    aliases: ['p'],
    category: 'Music',
    usage: 'play [titulo/URL]',
    description: "Reproduce una cancion u playlist de youtube.",
    run: async (client, message, args, track) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - No estamos en el mismo canal de voz!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Por favor indica el Nombre u la URL de alguna cancion!`);
        db.set(`queue`, `no`)
        client.player.play(message, args.join(" "), { firstResult: true });
    },
};