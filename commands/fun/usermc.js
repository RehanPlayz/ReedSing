const { MessageEmbed } = require(`discord.js`);
const mcapi = require("minecraft-lookup");
const MinecraftAPI = require('minecraft-api');

module.exports = {
    name: "usermc",
    category: "fun",
    description: "Obten informacion sobre un jugador MC.",
    run: async (client, message, args) => {  
        const mcplayer = args[0] //Nombre de la skin
        const user = message.mentions.users.first() 

        if (!mcplayer) { //Si no proporciona el nombre de la skin
            return message.channel.send("Dime el nombre de un jugador.") //Esto enviara un mensaje si no se envió el nombre de la skin
        }
          if (user) {
            return message.channel.send(`Por favor no mencione a ningun miembro del servidor.`)
        }
          const uuid = await MinecraftAPI.uuidForName(mcplayer); 
              console.log(uuid);
      
          if (uuid === undefined) {
            return message.channel.send(`El jugador ***${mcplayer}*** no existe o posiblemente no es **Premium**.`)
          }

        let embed = new MessageEmbed()
        .setAuthor(`Informacion Sobre ${mcplayer}`, `https://crafatar.com/avatars/${uuid}`)
        .setColor("#000000")
        .addFields(
          { name: '**➔ Nick**', value: `\`\`\`${mcplayer}\`\`\``, inline: true },
          { name: '**➔ UUID**', value: `\`\`\`${uuid}\`\`\``, inline: true },
        )
        //.addField(`**➔ Roles [${roles.length}] (Mostrando hasta 10 roles)**`, ``)
        message.channel.send(embed)
 }
}