module.exports = (client, message, query) => {
    message.channel.send(`${client.emotes.error} - No hay resultados en youtube para \`${query}\`!`);
};