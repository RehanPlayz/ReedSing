module.exports = (client, message, queue, playlist) => {
    message.channel.send(`${client.emotes.music} - ${playlist.title} ha sido añadida a la queue (**${playlist.tracks.length}** songs)!`);
};