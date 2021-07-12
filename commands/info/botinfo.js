const { MessageEmbed, version: djsversion } = require('discord.js');
const { formatBytes, parseDur } = require('../../function2');
const cpuStat = require('cpu-stat');
const config = require("../../config/config")
const moment = require('moment');
const os = require('os');

const formatOS = {
	aix: 'IBM AIX',
	darwin: 'Darwin',
	freebsd: 'FreeBSD',
	linux: 'Linux',
	openbsd: 'OpenBSD',
	sunos: 'SunOS',
	win32: 'Windows',
};

module.exports = {
    name: "botinfo",
    usage: "botinfo",
    description: "Obten informacion sobre el bot.",
    category: "info",
    botPermission: [],
    authorPermission: [],
	run: async (client, message, args) => {
		cpuStat.usagePercent(function(error, percent, seconds) {
			if(error) {
				return console.error(error);
			}
			const embed = new MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
				.setColor(message.guild.members.cache.get(client.user.id).displayHexColor)
				.setFooter(`Requested by ${message.author.tag} `)
				.setTimestamp()
				.setTitle('Informacion de ReedSing Bot')
				.addField('<:document:863627285005467698> General ➔', [
					`> **:space_invader: Bot Name: \`${client.user.tag}\`**`,
					`> **\\📇 Bot ID: \`${client.user.id}\`**`,
					`> **\\👑 Dueño: \`${client.users.cache.get(config.discord.ownerID).tag}\`**`,
					`> **\\👥 Usuarios: \`${client.users.cache.size.toLocaleString()}\` Usuarios**`,
					`> **\\📺 Canales: \`${client.channels.cache.size.toLocaleString()}\` Canales**`,
					`> **\\💬 Comandos: \`${client.commands.size}\` Comandos**`,
					`> **\\📅 Creado: \`${moment(client.user.createdTimestamp).format('MMMM Do YYYY, h:mm:ss')}\` | \`${Math.floor((Date.now() - client.user.createdTimestamp) / 86400000)}\` dia(s) atras**`,
					'\u200b',
				])
				.addField('<:document:863627285005467698> Sistema ➔', [
					`> **<:Online:863423618082930699> Uptime: ${parseDur(client.uptime)}**`,
					`> **<:nodejs:863625854079860776> Node.js: \`${process.version}\`**`,
					`> **<:discordjs:863626333389455430> Discord.js: \`v${djsversion}\`**`,
					`> **\\🖥 Plataforma: \`${formatOS[os.platform]}\`**`,
					`> **\\📊 Memoria: \`${formatBytes(process.memoryUsage().heapUsed)} / ${formatBytes(process.memoryUsage().heapTotal)}\`**`,
					`> **\\💻 CPU: \`${os.cpus()[0].model.split('CPU')[0]}${os.cpus().length} Cores ${os.cpus()[0].model.split('CPU ')[1]}\`**`,
				]);
			message.channel.send(embed);
		});
    }
}