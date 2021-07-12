const db = require('quick.db')
module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - La musica ha parado, me saldre del canal de voz!`);
    db.delete(`queue`)
};