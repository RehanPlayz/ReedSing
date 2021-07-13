const backup = require('discord-backup');
const config = require("../../config/config")

module.exports = {
    name: "backup-create",
    aliases: ["bc"],
    category: "backup",
    usage: "backup-create",
    description: "Crea un backup de servidor, en caso de problemas!",
    botPermission: ['ADMINISTRATOR'],
    authorPermission: ['ADMINISTRATOR'],
    run: async (client, message, args) => {
    backup.create(message.guild).then((backupData) => {

        return message.channel.send(`<:yes:863629754463551499> | Se ha guardado un nuevo backup, usalo en caso de emergencias. \n\n**\`ID: ${backupData.id}\`**\n\nUsa **\`${config.discord.default_prefix}load-backup ${backupData.id}\`** para cargar el backup.`);

    }).catch(() => {

        return message.channel.send('<:no:863629746042961932> | Un error ha pasado, Habla con mi desarrolador.');

    });

}
}