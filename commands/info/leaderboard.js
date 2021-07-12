const { MessageEmbed } = require('discord.js')
const XP = require('quick.xp');
const data = new XP.SQLiteManager({
    deleteMessage: false,
    cooldown: 10000,
    levelUpMessage: `¡{{user}} Subiste de nivel perra, Sr.Maus te dara Caricias x{{level}}!`,
    levelUpChannel: '836992274093178880',
});
const db = require('quick.db');


module.exports = {
    name: "leaderboard",
    description: "Obten la Leaderboard..",
    usage: "leaderboard",
    category: "info",
    run: async (client, message, args) => {

        
        const lb = db.fetchAll().filter(data => data.ID.startsWith(`xp_${message.guild.id}_`)).sort((a, b) => b.data - a.data);
        const lv = db.fetchAll().filter(data => data.ID.startsWith(`requiredxp_${message.guild.id}_`)).sort((a, b) => b.data - a.data);
        const ld = db.fetchAll().filter(data => data.ID.startsWith(`level_${message.guild.id}_`)).sort((a, b) => b.data - a.data);

        if (lb.length < 1) return message.channel.send("No leaderboard");
        lb.length = 10;

        let i = 0;
        let final = '';
        let level = '';
        let xpe = '';

        const every = db.all().filter(i => i.ID.startsWith(`xp_${message.guild.id}`)).sort((a, b) => b.data - a.data);
        let myrank = every.map(x => x.ID).indexOf(`xp_${message.guild.id}_${message.author.id}`) + 1;

        for (i in lb) {

                let id = lb[i].ID.split('_')[2]
                let user = await client.users.cache.get(id);

                let position = lb.indexOf(lb[i]) + 1
                final += `__**\`${position}\`**__ ${user}\n`;

                let e = db.fetch(`level_${message.guild.id}_${id}`)
                level += `\`${e}\`\n`

                let xp = lb[i].data      
                let a = `${lv[i].data.toLocaleString('en')}`
                xpe += `\`${xp}/${a}\`\n`;
            }

        let embed = new MessageEmbed()
          .setAuthor(`📊 ${message.guild.name} LeaderBoard`, client.user.avatarURL())
            .addFields(
                { name: "Miembros", value: final, inline: true },
                { name: 'Nivel', value: level, inline: true },
                { name: 'Exp', value: xpe, inline: true },
            )
            .setColor("#efcb83")
            .setFooter(`Tu Puesto Es » ${myrank} | Leaderboards son Estadísticas Globales`);
            message.channel.send(embed);
            }
        }