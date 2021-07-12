const db = require('quick.db')
const ms = require('parse-ms')
 
module.exports = {
  name: "afk",
  category: "fun",
  description: "Usado por si te ocupas.",
run: async (client, message, args) => {
  
  const content = args.join(" ") || 'Actualmente estoy afk, responderé lo antes posible.'
 
  await db.set(`afk_${message.guild.id}_${message.author.id}`, content)
  message.channel.send(`${message.author}, He establecido tu **Ausencia** a: \`${content}\``)
  
  }  
}

