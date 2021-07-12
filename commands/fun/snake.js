const { MessageEmbed } = require("discord.js");
const SnakeGame = require('snakecord');
const { Snake }  = require("weky")


module.exports = {
    name: "snake",
    category: "fun",
    description: "Juega con la serpiente.",
    run: async (client, message, args) => {
      
        const game = new Snake({
            message: message,
                  embed: {
                           title: 'Juego De La Serpiente Comedora De Manzanas', 
                           color: 'GREEN', 
                           gameOverTitle: "Perdiste ante la diabetes.", 
                  },
                 emojis: {
                          empty: '⬛', 
                          snakeBody: '🟢', 
                          food: '🍎 ', 
                         //controls
                           up: '⬆️', 
                           right: '⬅️',
                           down: '⬇️',
                           left: '➡️'
                 }
                        })
        game.start()
    }
}