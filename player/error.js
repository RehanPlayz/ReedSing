const db = require('quick.db')
module.exports = (client, error, message, ...args) => {
    db.delete(`queue`)
    switch (error) {
        case 'NotPlaying':
            message.channel.send(`${client.emotes.error} No se está reproduciendo música en este servidor!`);
            break;
        case 'NotConnected':
            message.channel.send(`${client.emotes.error} No estás conectado en ningún canal de voz!`);
            break;
        case 'UnableToJoin':
            message.channel.send(`${client.emotes.error} No puedo unirme a su canal de voz, verifique mis permisos!`);
            break;
        case 'VideoUnavailable':
            message.channel.send(`${client.emotes.error} ${args[0].title} No está disponible en tu país! Saltando ...`);
            break;
        case 'MusicStarting':
            message.channel.send(`La música está comenzando ... por favor espere y vuelva a intentarlo!`);
            break;
        default:
            message.channel.send(`${client.emotes.error} Algo salió mal ... Error: ${error}`);
    };
};
