const db = require("quick.db")
const { MessageEmbed } = require("discord.js")

module.exports.run = async (client, oldMessage, newMessage) => {
       if (newMessage.author.bot) return;
               
       const messagedelete = new MessageEmbed()
       .setTitle("Mensaje Actualizado")
       .setColor("RANDOM")
       .addField("Actualizado Por:", newMessage.author)
       .addField("Actualizado en:", newMessage.channel)
       .addField("Mensaje Anterior:", oldMessage.content)
       .addField("Mensaje Actual:", newMessage.content);
       const ChannelID = db.get(`logs`); 
       if(!ChannelID) return;
       client.channels.cache.get(ChannelID).send(messagedelete);
}