const { MessageEmbed } = require("discord.js")

module.exports = {
        name: 'serverinfo',
        description: 'Shows informations about server',
        category: 'info',
    run: async (client, message, args) => {
    
        const onlineUsers = {
            online: message.guild.presences.cache.filter(presence => presence.status === "online").size,
            idle: message.guild.presences.cache.filter(presence => presence.status === "idle").size,
            dnd: message.guild.presences.cache.filter(presence => presence.status === "dnd").size,
          };
    
          const embed = new MessageEmbed()
            .setColor('GRAY')
            .setTitle(`${message.guild.name}`, message.guild.iconURL({ format: 'png', dynamic: true, size: 1024 }))
            .addField(`**Usuarios Online**`, `≫ \`${onlineUsers.online}\``, true)
            .addField(`👤 **Usuarios Totales**`,  `≫ \`${message.guild.memberCount}\``, true)
            .addField(`📜 **Roles**`, `≫ \`${message.guild.roles.cache.size}\``, true)
            .addField(`💬 **Canales De Texto**`, `≫ \`${message.guild.channels.cache.size}\``, true)
            .addField(`🌍 **Region Del Servidor**`, `≫ \`${message.guild.region}\``, true)
            .addField(`😎 **Emotes**`, `≫ \`${message.guild.emojis.cache.size}\``, true)
            .setTimestamp()
            .setFooter(`ReedSing Server `, client.user.displayAvatarURL())
    
          message.channel.send(embed);
    }
}