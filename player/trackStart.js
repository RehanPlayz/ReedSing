const db = require('quick.db')

module.exports = (client, message, track) => {

    if (db.fetch(`queue`) === `si`) {
        message.channel.send(`**:notes: Reproduciendo** \`${track.title}\` - Ahora!`)
    } else {
        db.set(`queue`, `si`)
        const baile = client.emojis.cache.find(emoji => emoji.name === "baile");
        message.channel.send(`**${baile} Me uni a \`${message.member.voice.channel.name}\` y me enlaze a ${message.channel}**`)
        message.channel.send(`**:mag_right: Buscando ** \`${track.title}\``);
        message.channel.send(`**:notes: Reproduciendo** \`${track.title}\` - Ahora!`)
    }
};