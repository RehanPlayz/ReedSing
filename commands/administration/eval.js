const sourcebin = require('sourcebin_js');
const { MessageEmbed } = require('discord.js');
const { clean } = require('../../function2');
const db = require('quick.db')

module.exports = {
	name: 'eval',
	category: 'Owner',
	aliases: ['ev'],
	description: 'Evaluate a specified JavaScript code.',
	usage: 'eval <code>',
	onlyOwner: true,
	run: async (client, message, args) => {
		const embed = new MessageEmbed()
			.addField('Entrada', '```js\n' + args.join(' ') + '```');


		const code = args.join(' ');
		if (!code) {
			return message.channel.send(
				'<:no:863629746042961932> | Por favor ingrese un codigo valido.',
			);
		}

		const words = ['secret', 'token', 'process.env', 'config.json'];
		for(const word of words) {
			if (code.replace('\\', '').toLowerCase().includes(word)) {
				embed.setTitle('Error!');
				embed.addField('Salida', '```Sos re noob :v```').setColor('GREEN');
				return message.channel.send(embed);
			}
		}

		try {
			const evaled = eval(code);
			const output = clean(evaled);
			if (output.length >= 1024) {
				let response;
				try {
					response = await sourcebin.create([
						{
							name: ' ',
							content: output,
							languageId: 'text',
						},
					], {
						title: 'Eval results',
						description: ' ',
					});
				}
				catch(e) {
					return message.channel.reply('<:no:863629746042961932> | Un error ha ocurrido, intentalo otra vez!');
				}

				embed.addField('Salida', `${response.url}`).setColor('GREEN');
			}
			else {
				embed.addField('Salida', `\`\`\`js\n${output}\`\`\``).setColor('GREEN');
			}

			embed.setTitle('Perfecto!');
			return message.channel.send(embed);

		}
		catch (error) {
			const err = clean(error);
			if (err.length >= 1024) {
				let response;
				try {
					response = await sourcebin.create([
						{
							name: ' ',
							content: err,
							languageId: 'text',
						},
					], {
						title: 'Eval results',
						description: ' ',
					});
				}
				catch(e) {
					return message.channel.reply('<:no:863629746042961932> | Un error ha ocurrido, intentalo otra vez!');
				}

				embed.addField('Salida', `${response.url}`).setColor('RED');
			}
			else {
				embed.addField('Salida', `\`\`\`js\n${err}\`\`\``).setColor('RED');
			}

			embed.setTitle('<:no:863629746042961932> | Error!');
			return message.channel.send(embed);
		}
	},
};