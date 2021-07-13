const ms = require('ms');

module.exports = {
    name: 'reroll',
    description: "Reroll Giveaways",
    usage: "reroll <giveawayID>",
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
        return message.channel.send('<:no:863629746042961932> | No se encontro la Giveaway con la ID: `'+ args.join(' ') +'`.');
    }

    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        message.channel.send('<:yes:863629754463551499> | La Giveaway ha sidos rerolled');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} has not ended yet.`)){
            message.channel.send('<:no:863629746042961932> | Por favor espera que la Giveaway termine.');
        } else {
            console.error(e);
            message.channel.send('<:no:863629746042961932> | Por favor espera que la Giveaway termine.');
        }
    });

}
}