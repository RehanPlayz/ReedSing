const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const config = require("../../config/config")
const { MessageMenuOption, MessageMenu } = require('discord-buttons');

module.exports = {
  name: "helpa",
  description: "Obten la lista de comandos con todo sus detalles",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.reply("No Existe el comando **" + args[0] + "**.");
      }

      let embed = new MessageEmbed()
        .setTitle(command.name[0].toUpperCase() + command.name.slice(1) + " Comando")
        .setDescription(command.description || "No proporcionado")
        .addField("Uso del Comando", command.usage ? "```js\n" + config.discord.default_prefix + command.usage + "```" : "No proporcionado")
        .setColor("GREEN")


      if(command.aliases && command.aliases.length) embed.addField("Alias", command.aliases.map(x => "`" + x +"`").join(", "))
      if(command.botPermission && command.botPermission.length) embed.addField("Permisos del bot", command.botPermission.map(x => "`" + x +"`").join(", "), true)
      if(command.authorPermission && command.authorPermission.length) embed.addField("Permisos del autor", command.authorPermission.map(x => "`" + x +"`").join(", "), true)

      return message.channel.send(embed);
    } else {
      const avatar = client.user.displayAvatarURL();
      const ReedSing1 = client.emojis.cache.find(emoji => emoji.name === "Home");
      const ReedSing2 = client.emojis.cache.find(emoji => emoji.name === "Info");
      const ReedSing3 = client.emojis.cache.find(emoji => emoji.name === "Fun");
      const ReedSing4 = client.emojis.cache.find(emoji => emoji.name === "Tickets");
      const ReedSing5 = client.emojis.cache.find(emoji => emoji.name === "Music");
      const ReedSing6 = client.emojis.cache.find(emoji => emoji.name === "Staff");
  
      //you can change the names and colors of embeds and buttons and other things...
      embeds = new MessageEmbed()
      .setTitle('Bienvenido a la interfaz de comandos de ReedSing!')
      .setDescription('Clickea en alguno de los botones para ver mis categorias. \nSi deseas saber informacion especifica de un comando usa, \n**\`!help <Comando>\`**')
      .setColor("#ff951e")         
      .setThumbnail('https://cdn.discordapp.com/emojis/862716833172553739.png?v=1')

      let main = db.fetch(`cdm_${message.guild.id}.MAIN`)
      embed1 = new MessageEmbed()
      .setTitle(`Comandos Principales!`)
      .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
      .addField("Comandos ...", `${main}`)
      .setColor("BLURPLE")
      .setFooter('1/5')
      .setThumbnail('https://cdn.discordapp.com/emojis/863601090419097610.png?v=1')

      let info = db.fetch(`cdm_${message.guild.id}.INFO`)
      embed2 = new MessageEmbed()
      .setTitle(`Comandos De Informacion`)
      .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
      .addField("Comandos ...", `${info}`)
      .setColor("GRAY")
      .setFooter('2/5')
      .setThumbnail('https://cdn.discordapp.com/emojis/863601629168795688.png?v=1')

      let fun = db.fetch(`cdm_${message.guild.id}.FUN`)
      embed3 = new MessageEmbed()
      .setTitle(`Comandos De Diversion`)
      .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
      .addField("Comandos ...", `${fun}`)
      .setColor("#ff951e")         
      .setFooter('3/5')
      .setThumbnail('https://cdn.discordapp.com/emojis/863601790125604904.png?v=1')

      embed4 = new MessageEmbed()
      .setTitle(`Comandos De Tickets`)
      .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
      .addField("Comandos ...", `a`)
      .setColor("GREEN")
      .setFooter('4/5')
      .setThumbnail('https://cdn.discordapp.com/emojis/863602125975715860.png?v=1')

      embed5 = new MessageEmbed()
      .setTitle(`Comandos De Musica`)
      .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
      .addField("Comandos ...", `a`)
      .setColor("PURPLE")
      .setFooter('5/5')
      .setThumbnail('https://cdn.discordapp.com/emojis/863603166306107401.png?v=1')

      let mod = db.fetch(`cdm_${message.guild.id}.MODERATION`)
      let admin = db.fetch(`cdm_${message.guild.id}.ADMINISTRATION`)
      embed6 = new MessageEmbed()
      .setTitle(`Comandos Staff`)
      .setDescription('Para informacion adicional de un comando usa, **\`!help <Comando>\`**')
      .addField("Comandos Moderacion", `${mod}`)
      .addField("Comandos Administracion", `${admin}`)
      .setColor("#DC143C")
      .setFooter('5/5')
      .setThumbnail('https://cdn.discordapp.com/emojis/863603372450643978.png?v=1')

      pages = [embed1, embed2, embed3, embed4, embed5, embed6]

      //you can change the names and colores of the buttons here
    let btn1 = new MessageMenuOption()
        .setLabel('Comandos Principales')
        .setEmoji(ReedSing1)
        .setValue('1')
        .setDescription('Importantes!')
    let btn2 = new MessageMenuOption()
        .setLabel('Comandos de Informacion')
        .setEmoji(ReedSing2)
        .setValue('2')
        .setDescription('Informacion!')
    let btn3 = new MessageMenuOption()
        .setLabel('Comandos de Diversion')
        .setEmoji(ReedSing3)
        .setValue('3')
        .setDescription('Diversion!')
    let btn4 = new MessageMenuOption()
        .setLabel('Comandos Tickets')
        .setEmoji(ReedSing4)
        .setValue('4')
        .setDescription('Tickets!')
    let btn5 = new MessageMenuOption()
        .setLabel('Comandos Musica')
        .setEmoji(ReedSing5) 
        .setValue('5')
        .setDescription('Musica!')
    let btn6 = new MessageMenuOption()
        .setLabel('Comandos Staff')
        .setEmoji(ReedSing6)
        .setValue('6')
        .setDescription('Moderacion, Administracion!')


    let select = new MessageMenu()
        .setID('HMenu')
        .setPlaceholder('Elije alguna opcion!')
        .addOption(btn1) 
        .addOption(btn2) 
        .addOption(btn3) 
        .addOption(btn4) 
        .addOption(btn5) 
        .addOption(btn6) 

      
      let msg = await message.channel.send('', {
          component: select,
          embed: embeds
        });
      client.on('clickMenu', async (menu) => {
          if (menu.clicker.user.id !== message.author.id) return;

          if (menu.values[0] === '1') {
           await msg.edit({
                  embed: embed1,
                  component: select,
              });
          }
          if (menu.values[0] === '2') {
            await msg.edit({
                  embed: embed2,
                  component: select,
              });
          }
          if (menu.values[0] === '3') {
            await msg.edit({
                  embed: embed3,
                  component: select,
              });
          }
          if (menu.values[0] === '4') {
            await msg.edit({
                    embed: embed4,
                  component: select,
              });
          }
          if (menu.values[0] === '5') {
            await msg.edit({
                  embed: embed5,
                  component: select,
              });
          }
          if (menu.values[0] === '6') {
            await msg.edit({
                  embed: embed6,
                  component: select,
              });
          }
      })
    }
  }
};
