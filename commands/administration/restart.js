const config = require("../../config/config")

module.exports = {
    name: "reiniciar",
    usage: "reiniciar",
    description: "Reinicia el bot.",
    category: "administration",
    botPermission: ['ADMINISTRATOR'],
    onlyOwner: true,
    authorPermission: ['ADMINISTRATOR'],
	run: async (client, message, args) => {
		try {
			message.channel.send('⚙ Reiniciando ...').then(msg => msg.delete({ timeout: 300 }))
				.then(() => client.destroy())
				.then(() => client.login(config.discord.token))
				.then(() => message.channel.send('<:yes:863629754463551499> Reinicio perfecto!'));
		}
		catch (e) {
			return message.channel.reply(
				'<:no:863629746042961932> Un error ha pasado, por favor vuelva a intentarlo!',
			);
		}
	},
};