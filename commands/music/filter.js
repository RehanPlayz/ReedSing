module.exports = {
    name: 'filter',
    aliases: [],
    category: 'Music',
    description: "Pone filtros a la musica.",
    usage: 'filter [nombre del filtro]',
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} - No estamos en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} - No hay musica actualmente en reproduccion!`);

        if (!args[0]) return message.channel.send(`${client.emotes.error} - Por favor dime un filtro valido para activar o desactivar!`);

        const filterToUpdate = client.filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

        if (!filterToUpdate) return message.channel.send(`${client.emotes.error} - Este filtro no existe, intenta por ejemplo (8D, vibrato, pulsator...)!`);

        const filtersUpdated = {};

        filtersUpdated[filterToUpdate] = client.player.getQueue(message).filters[filterToUpdate] ? false : true;

        client.player.setFilters(message, filtersUpdated);

        if (filtersUpdated[filterToUpdate]) message.channel.send(`${client.emotes.music} - Estoy **añadiendo** el filtro a la cancion, espera por favor ... \nNota: Cuanto mas larga la cancion, mas tiempo tomara.`);
        else message.channel.send(`${client.emotes.music} - Estoy **desactivando** el filtro a la cancion, espera por favor ... \nNota: Cuanto mas larga la cancion, mas tiempo tomara.`);
    },
};