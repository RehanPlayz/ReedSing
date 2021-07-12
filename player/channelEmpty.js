const db = require('quick.db')
module.exports = (client, message, queue) => {
    message.channel.send(`${client.emotes.error} - La musica ha parado, pues no hay absolutamente nadie aqui!`);
    db.delete(`queue`)
};