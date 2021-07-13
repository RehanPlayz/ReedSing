const db = require("quick.db")
const stripIndent = require("common-tags").stripIndent;
const config = require('../config/config');


module.exports.run = (client) => {  
  
  console.log(stripIndent`
  ----------------------------------------
  @${client.user.username} esta online!
  V.${config.bot.botVersion} | ID: ${client.user.id}
  Hecho por: ${config.bot.botCreator}
  ----------------------------------------
  `);  
  client.user.setActivity(db.get(`status`) || "ReedSing | SrIcognito");
  
}