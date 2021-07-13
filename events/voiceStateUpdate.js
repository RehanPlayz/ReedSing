 const db = require("quick.db")
 const { Collection } = require('discord.js');
 const voiceCollection = new Collection();

 module.exports.run = async (client, oldState, newState) => {    
        const user = await client.users.fetch(newState.id);
        const member = newState.guild.member(user)
        let chn = db.fetch(`gpvc_${newState.guild.id}`)
    
        if(!oldState.channel && newState.channel.id === chn) {
            const channel = await newState.guild.channels.create(`🗣 ${user.username}`, {
                type: 'voice',
                userLimit: '10',
                parent: newState.channel.parent,
            });
            member.voice.setChannel(channel);
            voiceCollection.set(user.id, channel.id);
        } else if(!newState.channel) {
            if(oldState.channelID === voiceCollection.get(newState.id)) return oldState.channel.delete()
        }
} 