const db = require("quick.db")
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "warnings",
  usage: "warnings <@user>",
  botPermission: ['MANAGE_MESSAGES'],
  authorPermission: ['MANAGE_MESSAGES'],
  description: "Recibe las advertencias tuyas o de la persona mencionada.",
  category: "moderation",
  run: (client, message, args) => {
    if (message.deletable) {
      message.delete();
  }
  
    const user = message.mentions.members.first() || message.author
    
  
    let warnings = db.get(`warnings_${message.guild.id}_${user.id}`)
    let ad = db.fetch(`warningsg_${message.guild.id}_${user.id}`)

    
    if(warnings === null) warnings = 0;
    if(ad === null) ad = 0;

    const embed1 = new MessageEmbed()
    .setTitle(`**__Advertencias De ${user}__**`)
    .setColor('RED')
    .addFields(
      { name: 'Advertencias Totales', value: `${ad}`, inline: true },
      { name: 'Advertencias Actuales', value: `${warnings}`, inline: true },
    )

    message.channel.send(embed1)
  
  
  }
}