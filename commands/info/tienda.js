const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "shop",
    category: "info",
    description: "Apoya a la network.",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
        .setAuthor(`TIENDA`, 'https://cdn.discordapp.com/emojis/864544195791159317.png?v=1', 'https://tienda.reedsing.club')
        .setThumbnail("https://thumbs.gfycat.com/AcademicGlassHyena-small.gif")                
        .setColor("#cf0000")          
        .setDescription('> Tu donacion nos ayuda en el mantenimiento y desarrollo de ReedSing. Todo aporte es apreciado.\n> Ayudanos a crecer entrando a la tienda la cual esta [***Aqui***](https://tienda.reedsing.club)')
        message.channel.send(embed);
    }
}