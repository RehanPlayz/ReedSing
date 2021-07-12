const {MessageEmbed} = require("discord.js")
const { readdirSync } = require("fs");
const db = require("quick.db")

module.exports = {
  name: "embed",
  category: "moderation",
  usage: "setlogs <#channel>",
  description: "Establece el canal de logs.",
  run: (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_CHANNELS")) {
      return message.channel.send(
        "Lo siento, pero no tienes permisos."
      ).then(msg => {msg.delete({ timeout: 10000 })})
    }
    
    const avatar = message.author.displayAvatarURL();

    //you can change the names and colors of embeds and buttons and other things...
    embeds = new MessageEmbed()
    .setTitle('Bienvenido a la interfaz de comandos de ReedSing!')
    .setDescription('Clickea en alguno de los botones para ver mis categorias. \nSi deseas saber informacion especifica de un comando usa, \n**\`!help <Comando>\`**')
    .setColor('#ffa861')
    .setTimestamp();

    let main = db.fetch(`cdm_${message.guild.id}.MAIN`)
    embed1 = new MessageEmbed()
    .setTitle(`Comandos Principales!`)
    .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
    .addField("Comandos ...", `${main}`)
    .setColor("BLURPLE").setFooter('1/5')
    .setThumbnail(avatar)

    let info = db.fetch(`cdm_${message.guild.id}.INFO`)
    embed2 = new MessageEmbed()
    .setTitle(`Comandos De Informacion`)
    .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
    .addField("Comandos ...", `${info}`)
    .setColor("RED").setFooter('2/5')
    .setThumbnail(`${avatar}`)

    embed3 = new MessageEmbed()
    .setTitle(`Voice Chat commands 🎤`)
    .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
    .addField("commands:", "**list of your commands**,")
    .setColor("GRAY").setFooter('3/5')
    .setThumbnail(`${avatar}`)

    embed4 = new MessageEmbed()
    .setTitle(`Game Commands 🎮`)
    .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
    .addField("commands:", "**list of your commands**,")
    .setColor("GRAY").setFooter('4/5')
    .setThumbnail(`${avatar}`)

    embed5 = new MessageEmbed()
    .setTitle(`Fun Commands 🤪`)
    .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
    .addField("commands:", "**list of your commands**,")
    .setColor("GREEN")
    .setFooter('5/5').setThumbnail(`${avatar}`)

    var embeds = [embed1, embed2, embed3, embed4, embed5], menu = {};

    const content = [1, 2, 3, 4, 5];
    
    menu.id = "menuyea";
    menu.placeholder = "Elije una opcion!";
    menu.selects = [];
    for (var i = 0; i < content.length; i++) {
      const select = { 
       id: `select_${content[i]}`, 
       label: `Option ${content[i]} `,
       description: `${content[i]} - select... description..`
      };
      menu.selects.push(select);
    }
    
    message.channel.menu(message.author.id, {
      embeds: embeds,
      menu: menu
      });
  }
}