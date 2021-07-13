const ms = require('ms');

module.exports = {
    name: 'end',
    description: "Termina las Giveaways",
    usage: "end <giveawayID>",
    aliases: ["stop"],
    botPermission: ['MANAGE_MESSAGES'],
    authorPermission: ['MANAGE_MESSAGES'],
    run: async(client, message, args) => {

    if(!args[0]){
        return message.channel.send('<:no:863629746042961932> | Por favor especifica la Giveaway ID');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send('<:no:863629746042961932> | No se encontro la Giveaway con la ID: `'+ args.join(' ') + '`.');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send('<:yes:863629754463551499> | El sorteo terminará en menos de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with given ID ${giveaway.messageID} has already ended.`)){
            message.channel.send('<:no:863629746042961932> | ¡Este sorteo ya ha terminado!');
        } else {
            console.error(e);
            message.channel.send('<:no:863629746042961932> | ¡Este sorteo ya ha terminado!');
        }
    });

}
}