const { MessageEmbed } = require("discord.js");
const Gamedig = require("gamedig");
const mcapi = require("minecraft-lookup");

module.exports = {
    name: "status",
    category: "info",
    description: "Informacion sobre el servidor de mc.",
    run: async (client, message, args) => { 
      const firecra = client.emojis.cache.find(emoji => emoji.name === "FireCraft");
      const firemod7 = client.emojis.cache.find(emoji => emoji.name === "FireMods1710");
      const firemod2 = client.emojis.cache.find(emoji => emoji.name === "FireMods1122");
      const svip = 'play.reedsing.club'

      let sv6 = await Gamedig.query({ 
        type: 'minecraft', 
        host: svip, 
    }).catch((error) => {
      embed = new MessageEmbed()
      .setTitle(`ReedSing | Apagado`)
      message.channel.send(embed) 
    }); 
    let motd6 = `http://status.mclive.eu/ReedSing%20[1.16]/play.reedsing.club/banner.png` 
    let icon = (await mcapi.server(svip)).servericon
    let onp = (await mcapi.server(svip)).players.online
    let lp = (await mcapi.server(svip)).players.max
    let ver = (await mcapi.server(svip)).version
    let ping = (await mcapi.server(svip)).debug.ping

      const embed = new MessageEmbed()
      .setAuthor(`ReedSing | Estatus`, 'https://cdn.discordapp.com/emojis/862716833172553739.png?v=1')
      .setColor('RED')
      .addFields(
        { name: "Jugadores", value: `\`${onp}/${lp}\``, inline: true },
        { name: 'Version', value: `\`${ver} \``, inline: true },
        { name: 'IP', value: `\`${svip}\``, inline: true },
      )
      .setImage(motd6)                                                                                                                    
      message.channel.send(embed)

  },
};