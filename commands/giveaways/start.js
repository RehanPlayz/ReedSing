const ms = require('ms');
const db = require('quick.db')
module.exports = {
    name: 'start',
    description: "Da regalos a los miembros!",
    usage: "start <duration> <n.winners> <prize>",
    aliases: ["host", "giveaway"],
    botPermission: ['MANAGE_MESSAGES'],
    authorPermission: ['MANAGE_MESSAGES'],
    run: async(client, message, args) => {

    let ass = db.fetch(`give_${message.guild.id}`)
    let giveawayChannel = client.channels.cache.get(ass)
    if(!giveawayChannel){
        return message.channel.send('<:no:863629746042961932> | No existe un canal para giveaways, usa /configuracion setup canales');
    }

    let giveawayDuration = args[0];
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send('<:no:863629746042961932> | Por favor especifica la duracion. Ejemplo: 30s, 1m, 12h');
    }

    let giveawayNumberWinners = parseInt(args[1])
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send('<:no:863629746042961932> | Por favor especifica la cantidad de ganadores. Ejemplo: 1, 2, 5');
    }

    let giveawayPrize = args.slice(2).join(' ');
    if(!giveawayPrize){
        return message.channel.send('<:no:863629746042961932> | Por favor especifique un premio. Ejemplo: Nitro, Steam Giftcard, Spotify Premium');
    }

    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayNumberWinners,
        hostedBy: message.author.username,
        messages: {
            giveaway: "🎊 **Tiempo de un Giveaway !** 🎊",
            giveawayEnded: " **El Giveaway a terminado!** ",
            timeRemaining: "Tiempo restante: **{duration}**!",
            inviteToParticipate: "Reacciona con 🎉 para participar!",
            winMessage: "Felicitaciones, {winners}! ¡Has ganado **{prize}**!",
            noWinner: "No hay participantes validos o ya termino el Giveaway",
            hostedBy: "Hosteado por: {user}",
            winners: "ganador(es)",
            endedAt: "Terminó a las",
            units: {
                seconds: "Segundos",
                minutes: "Minutos",
                hours: "Horas",
                days: "Dias",
                pluralS: false
            }
        }
    });

    message.channel.send(`Giveaway started in ${giveawayChannel}!`);
    }
};