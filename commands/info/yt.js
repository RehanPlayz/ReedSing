const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "yt",
    category: "info",
    description: "Requisitos de rangos MYT-YT-Famous",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setAuthor(`REQUISITOS YOUTUBER`, 'https://cdn.discordapp.com/emojis/864542249022521355.png?v=1')
        .setThumbnail("https://thumbs.gfycat.com/BruisedOrnateBullfrog-small.gif")                
        .setColor("#ff0000")          
        .setDescription('Cada vídeo debe tener un mínimo de 6 minutos de duración.\nCada vídeo debe tener en la IP y Discord del server.\nEl primer vídeo debe ser respecto a la review del server.')
        .addField(`** **`, `** **`)
        .addFields(
            { name: "> **MYT**", value: `-> **250** seguidores.\n-> **2** Videos Semanal.`, inline: true },
            { name: '> **YT**', value: `-> **500** seguidores.\n-> **1** Video Semanal.`, inline: true },
            { name: '> **FAMOUS**', value: `-> **1000** seguidores.\n-> **1** Video al mes.`, inline: true },
          )              
        message.channel.send(embed);
    }
}