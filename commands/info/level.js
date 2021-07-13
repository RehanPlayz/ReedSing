const Discord = require('discord.js')
const XP = require('quick.xp');
const xp = new XP.SQLiteManager({
    deleteMessage: false,
    cooldown: 6000,
    levelUpMessage: `¡{{user}} Subiste de nivel perra, Sr.Maus te dara Caricias x{{level}}!`,
    levelUpChannel: '836992274093178880',
});
const db = require('quick.db');
const { CanvasSenpai } = require("canvas-senpai")
const canva = new CanvasSenpai();

module.exports = {
    name: "level",
    description: "Obten el nivel del mencionado u del author.",
    usage: "level <user>",
    category: "info",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const bg = db.get(`background_${user.id}`) || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSew2HtvXGlizlfolQ7xnkXEgurEzz0SNM6dTT2dspdrdcHAttnElpTDKIFDosI67H_BHw&usqp=CAU"

        if (user.id === client.user.id) { //IF BOT
            return message.channel.send("😉 | Yo soy nivel 100")
        }

        if (user.bot) {
            return message.channel.send("<:no:863629746042961932> | Los bots no tienen niveles")
        }

        let level = xp.getLevel(message, user.id)
        if(level === NaN) level = '0'
        if(level === null) level = '0'
        if(level === undefined) level = '0'
        if(level === 0) level = '0'
        let nextlevel = level + 1
        let remxp = xp.getXP(message, user.id)
        let rexp = db.get(`previousrequired_${message.guild.id}_${message.author.id}`)
        let required = rexp + 50 * nextlevel;

        const every = db.all().filter(i => i.ID.startsWith(`xp_${message.guild.id}`)).sort((a, b) => b.data - a.data);
        let rank = every.map(x => x.ID).indexOf(`xp_${message.guild.id}_${user.id}`) + 1;

        let data = await canva.rankcard(
            {
              link: bg,
              name: user.username,
              discriminator: user.discriminator,
              level: level,
              rank: rank,
              currentXP: remxp,
              fullXP: required,
              avatar: user.displayAvatarURL({ format: "png", size: 1024 })
            
            })
        
        const attachment = new Discord.MessageAttachment(data, "rank.png");
           message.channel.send(``, attachment);
        
    }
}