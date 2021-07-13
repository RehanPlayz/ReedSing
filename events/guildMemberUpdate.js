const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, oldMember, newMember) => {
        const oldstatus = oldMember.premiumSince;
        const newstatus = newMember.premiumSince;

        const boost = client.emojis.cache.find(emoji => emoji.url === "boost");

        const messagedelete = new MessageEmbed()
        .setTitle(`¡${newMember.username} ha mejorado el servidor!`, boost)
        .setColor('RANDOM')
        .setDescription(`Gracias por mejorar el servidor, ahora puedes reclamar tus recompensas!`)
        .setFooter(`El servidor esta en desarrollo, aun no damos recompensas.`, 'https://cdn.discordapp.com/emojis/847471742267162624.png?v=1')

        const messagedelete2 = new MessageEmbed()
        .setTitle(`¡${newMember.username} ha quitado una mejora al servidor!`, boost)
        .setColor('RANDOM')
        .setDescription(`Las recompensas que ya tenias se te seran removidas, si las deseas otra vez, Mejora!`)
        .setFooter(`El servidor esta en desarrollo, aun no damos recompensas.`, 'https://cdn.discordapp.com/emojis/847471742267162624.png?v=1')

        const ChannelID = db.get(`boost_${newMember.guild.id}`); 
        if(!ChannelID) return;
       if (oldstatus && newstatus) {
                client.channels.cache.get(ChannelID).send(messagedelete);
       }

       if (oldstatus && !newstatus) {
        client.channels.cache.get(ChannelID).send(messagedelete2);
}
}