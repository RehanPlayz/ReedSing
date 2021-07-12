module.exports = (client, message, query, tracks) => {
    message.channel.send(`${client.emotes.error} - No proporcionó una respuesta válida ... Vuelva a enviar el comando!`);
};