const { MessageEmbed } = require("discord.js");
const db = require("quick.db")
const config = require("../../config/config")
module.exports = {
  name: "help",
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
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setAuthor("Comandos de ReedSing")
        .setDescription("Aqui encontraras los comandos mios!")
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Desconocidos";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        emx.addField(`${category.toUpperCase()} [${value.length}]`, desc);
      }

      let database = db.get(`cmd_${message.guild.id}`)

      if (database && database.length) {
        let array = []
        database.forEach(m => {
          array.push("`" + m.name + "`")
        })

        emx.addField("Comandos personalizados", array.join(", "))
      }

      return message.channel.send(emx);
    }
  }
};
