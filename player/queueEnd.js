const db = require('quick.db')
module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} La música se detuvo porque no hay más música en la cola!`);
    db.delete(`queue`)
};