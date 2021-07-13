const backup = require('discord-backup');
module.exports = {
    name: "backup-load",
    aliases: ["bload"],
    category: "backup",
    usage: "backup-load",
    description: "Carga el backup de servidor.",
    botPermission: ['ADMINISTRATOR'],
    authorPermission: ['ADMINISTRATOR'],
    run: async (client, message, args) => {

    const backupID = args.join(' ');

    backup.fetch(backupID).then(() => {

        message.channel.send(':warning: Los canales, roles y permisos seran borrados y cambiados por los del Backup, estas seguro?\n\nElije entre \`Si/No\`');

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['No', 'Si'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === 'Si';
            collector.stop();
            if (confirm) {

                backup.load(backupID, message.guild).then(() => {

                    return message.author.send('<:yes:863629754463551499> | Backup cargado perfectamente.');
            
                }).catch((err) => {
            
                    if (err === 'No backup found')
                        return message.channel.send('<:no:863629746042961932> | No existe el backup con la ID: '+backupID+'!');
                    else
                        return message.author.send('<:no:863629746042961932> | Un error ha pasado: '+(typeof err === 'string') ? err : JSON.stringify(err));
            
                });

            } else {
                return message.channel.send('<:no:863629746042961932> | Se cancela la subida del Backup.');
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
                return message.channel.send('<:no:863629746042961932> | Te demoraste en escoger.');
        })

    }).catch(() => {
        return message.channel.send('<:no:863629746042961932> | No existe el Backup con la ID: '+backupID+'!');
    });

}
}