const { MessageEmbed } = require('discord.js')
const moment = require("moment");
require('moment-duration-format')

module.exports = {
    name: "uptime",
    category: "info",
    description: "Revisa el uptime del bot.",
    run: async (client, message, args, channel) => {

let uptime = moment.duration(client.uptime).format("D [ Dias] h[ Horas] m[ Minutos] s[ Segundos]")
const Online = client.emojis.cache.find(emoji => emoji.name === "Online");
let bicon = client.user.displayAvatarURL()

const botembed = new MessageEmbed()
.setTitle("ReedSing Uptime")
.setColor('GRAY')
.setDescription(`${Online} **ReedSing a estado activo por** \`${uptime}\`. \n :satellite: **El ping actualmente es de** \`${client.ws.ping} Ms\`.`)
.setTimestamp()
.setFooter('© ReedSing', bicon)
.setThumbnail(bicon)
message.channel.send(botembed);
    }
}