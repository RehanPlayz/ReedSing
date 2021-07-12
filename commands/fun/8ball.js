const { MessageEmbed } = require("discord.js");
const respuestas = ["Sí", "No", "Tal vez", "No sé", "¡Claro!", "Por supuesto", " Por supuesto que no", "Claro que no", "Definitivamente","Quizás","Emm, quien sabe esa pregunta no se como contestarla"];

module.exports = {
    name: "8ball",
    category: "fun",
    description: "Bolita Magica.",
    run: async (client, message, args) => {
        let pregunta = args.join(" ") //Definimos args.join
        let result = Math.floor((Math.random() * respuestas.length));
      
      
        if (!args[0])
        return message.channel.send(`Debes escribir una pregunta.`);
      
        const embed = new MessageEmbed()
        .addField("Tu Pregunta",`${pregunta}`)
        .addField("Bolita Magica Responde ...", respuestas[result])
        .setColor('RANDOM')
        .setThumbnail('https://media.tenor.com/images/2275326710afd643596098f31137c5dd/tenor.gif')
      
        message.channel.send(embed)
      
      }
}