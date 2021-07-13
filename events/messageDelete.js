 const db = require("quick.db")
 const { MessageEmbed } = require("discord.js")
 
 
 /**
  * @param {Object} [client]
  * @param {Object} [member]
  * @param {Object} [message]
  */
 
 module.exports.run = async (client, message, member) => {
        if (message.author.bot) return;
                
        const messagedelete = new MessageEmbed()
        .setTitle("Mensaje eliminado")
        .setColor("RANDOM")
        .addField("Eliminado Por:", message.author)
        .addField("Eliminado En:", message.channel)
        .addField("Mensaje Borrado:", message.content);
        const ChannelID = db.get(`logs`); 
        if(!ChannelID) return;
        client.channels.cache.get(ChannelID).send(messagedelete);
}