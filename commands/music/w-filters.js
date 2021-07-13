const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'w-filters',
    aliases: ['filters'],
    category: 'Music',
    usage: 'w-filters',
    description: "Revisa que filtros estan activados y cuales no.",
    run: async (client, message, args) => {
        if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} - No estas en un canal de voz!`);

        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${client.emotes.error} No estamos en el mismo canal de voz!`);

        if (!client.player.getQueue(message)) return message.channel.send(`${client.emotes.error} No hay musica actualmente en reproduccion!`);

        const filtersStatuses = [[], []];

        client.filters.forEach((filterName) => {
            const array = filtersStatuses[0].length > filtersStatuses[1].length ? filtersStatuses[1] : filtersStatuses[0];
            array.push(filterName.charAt(0).toUpperCase() + filterName.slice(1) + " : " + (client.player.getQueue(message).filters[filterName] ? '<:yes:863629754463551499>' : '<:no:863629746042961932>'));
        });

        const embed = new MessageEmbed()
        .setTitle(`Filtros para ${message.guild.name}`)
        .setDescription(`Lista de todos los filtros activados o desactivados. \nUsa \`${client.config.discord.default_prefix}filter\` para añadir el filtro a la cancion.`)
        .addFields(                    
            { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
            { name: '** **', value: filtersStatuses[1].join('\n'), inline: true },
        )

        message.channel.send(embed)
    }
};