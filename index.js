// const { token } = require("./config.json");
var Discord = require("discord.js");
const SHClient = require('shandler');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const Buttons = require("discord-buttons");
const ButtonsMenu = require("discord-menu-embed");
const { Player } = require('discord-player');
const fs = require('fs');
const Client = new Discord.Client({
  disableEveryone: true
});

Buttons(Client);
ButtonsMenu(Client);
Discord.MessageMenu = Buttons.MessageMenu;
Discord.MessageMenuOption = Buttons.MessageMenuOption;
Discord.MessageActionRow = Buttons.MessageActionRow;


Client.commands = new Discord.Collection();
Client.category = new Discord.Collection();
Client.aliases = new Discord.Collection();
Client.player = new Player(Client);
Client.config = require('./config/config');
Client.emotes = Client.config.emojis;
Client.filters = Client.config.filters;


["command", "events"].forEach(handler => {
  require(`./handlers/${handler}`)(Client);
});

// Slash-Commands
const options = {
  commandsDir: 'slashcommands', // commands folder path (required)
  showLogs: 'normal', // "extra"|"normal"|null (default: "extra")
  wrapper: false, // defaults to false
  cLogs: true, // logs most of the resolved promises
  autoDelete: true, // Automatically syncs the global application commands
  autoRegister: true // Automatically register commands
}

const handler = new SHClient(Client, options);

// Anti-Spam
const map = new Map();
const LIMIT = 5;
const TIME = 5000;
const DIFF = 3000;

Client.on('message', async (message) => {
  if(message.author.bot) return;
  if(map.has(message.author.id)) {
    const data = map.get(message.author.id);
    const { lastMessage, timer } = data;
    const diff = message.createdTimestamp - lastMessage.createdTimestamp;
    let msgCount = data.msgCount;
    console.log(diff);

    if(diff > DIFF) {
        clearTimeout(timer);
        data.msgCount = 1;
        data.lastMessage = message;
        data.timer = setTimeout(() => {
            map.delete(message.author.id);
        }, TIME);
        map.set(message.author.id, data)
    } else {
        ++msgCount;
        if(parseInt(msgCount) === LIMIT) {
          const embedspam = new MessageEmbed()
          .setAuthor(`${message.author.tag} ha sido advertido`, message.author.displayAvatarURL({ dynamic: true }))
          .setDescription(`**Razón:** Spamear`)
          message.channel.messages.fetch({ limit: 5 }).then((messages) => { 
            const botMessages = [];
            messages.filter(m => m.author.id === message.author.id).forEach(msg => botMessages.push(msg))
            message.channel.bulkDelete(botMessages).then(() => {
              message.channel.send(embedspam).then(msg => {msg.delete({ timeout: 10000 })})
              db.add(`warnings_${message.guild.id}_${message.author.id}`, 1)
              db.add(`warningsg_${message.guild.id}_${message.author.id}`, 1)
            });
          })
        } else {
            data.msgCount = msgCount;
            map.set(message.author.id, data);
        }
    }
} else {
    let fn = setTimeout(() => {
        map.delete(message.author.id);
    }, TIME);
    map.set(message.author.id, {
        msgCount: 1,
        lastMessage : message,
        timer : fn
    });
  }
})

// Music-Events
const player = fs.readdirSync('./player').filter(file => file.endsWith('.js'));

for (const file of player) {
    console.log(`Loading discord-player event ${file}`);
    const event = require(`./player/${file}`);
    Client.player.on(file.split(".")[0], event.bind(null, Client));
};

Client.login(Client.config.discord.token);