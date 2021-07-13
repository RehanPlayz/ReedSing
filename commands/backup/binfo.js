const {MessageEmbed} = require('discord.js');
const backup = require('discord-backup');


module.exports = {
    name: 'info-backup',
    aliases: ['info-b'],
    category: 'backup',
    usage: "info-backup",
    description: "Revisa la informacion del actual backup",
    botPermission: ['ADMINISTRATOR'],
    authorPermission: ['ADMINISTRATOR'],
   run: async (client, message, args) => {

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send('<:no:863629746042961932> | Por favor especifica un ID!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new MessageEmbed()
            .setTitle('<:document:863627285005467698> Informacion Sobre El Ultimo Backup', backup.data.iconURL)
            .setDescription(`> **Nombre del servidor**\n\`${backup.data.name}\`\n\n> **Tamaño**\n\`${backup.size}\`\n\n> **Creado el**\n\`${formattedDate}\``)
            .setFooter('ID: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send('<:no:863629746042961932> | No hay backup para la ID '+backupID+'!');
        else
            return message.channel.send('<:no:863629746042961932> | Un error ha pasado: '+(typeof err === 'string') ? err : JSON.stringify(err));

    });

  }
}