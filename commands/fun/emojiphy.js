const { MessageEmbed } = require('discord.js')

module.exports = {
        name: 'emojify',
        description: 'Hace emoji tu mensaje.',
		category: 'fun',
    run: async (client, message, args) => {
    
        if(!args[0]) {
			return message.channel.send(
				'❎ Por favor dime que transformo.',
			);
		}

		const specialChars = {
			'0': ':zero:',
			'1': ':one:',
			'2': ':two:',
			'3': ':three:',
			'4': ':four:',
			'5': ':five:',
			'6': ':six:',
			'7': ':seven:',
			'8': ':eight:',
			'9': ':nine:',
			'#': ':hash:',
			'*': ':asterisk:',
			'?': ':grey_question:',
			'!': ':grey_exclamation:',
			' ': '   ',
		};

		const emojified = `${args.join(' ')}`.toLowerCase().split('').map(letter => {
			if (/[a-z]/g.test(letter)) {
				return `:regional_indicator_${letter}: `;
			}
			else if (specialChars[letter]) {
				return `${specialChars[letter]} `;
			}
			return letter;
		}).join('');

		if(emojified.length > 2000) {
			return message.channel.send(`:x: El texto sobre pasa los limites.`);
		}

		message.channel.send(emojified);

    }
}