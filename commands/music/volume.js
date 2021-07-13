module.exports = {
    name: 'volume',
    aliases: [],
    category: 'Music',
    usage: 'volume <1-100>',
    description: "Sube o baja el volumen de la cancion actual.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} No estamos en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} No hay musica actualmente en reproduccion!`);

        if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity') return message.channel.send(`${client.emotes.error} Por favor dime un numero valido!`);

        if (Math.round(parseInt(args[0])) < 1 || Math.round(parseInt(args[0])) > 100) return message.channel.send(`${client.emotes.error} Por favor dime un numero desde el 1 al 100!`);

        const success = client.player.setVolume(message, parseInt(args[0]));

        if (success) message.channel.send(`${client.emotes.success} Volumen puesto a **${parseInt(args[0])}%**!`);
    },
};