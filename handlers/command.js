const { readdirSync } = require("fs");
const db = require('quick.db')
const ascii = require("ascii-table");

// Create a new Ascii table
let table = new ascii("Commands");
table.setHeading("Command", "Load status");
module.exports = (client) => {
    // Read every commands subfolder
    readdirSync(__dirname.replace("\handlers", "\commands")).forEach(dir => {
        // Filter so we only have .js command files
        const commands = readdirSync(`${__dirname.replace("\handlers", "\commands")}/${dir}/`).filter(file => file.endsWith(".js"));
    
        // Loop over the commands, and add all of them to a collection
        // If there's no name found, prevent it from returning an error,
        // By using a cross in the table we made.
        for (let file of commands) {
            let pull = require(`${__dirname.replace("\handlers", "\commands")}/${dir}/${file}`);
    
            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅');
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`);
                continue;
            }
    
            // If there's an aliases key, read the aliases.
            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
    // Log the table
    console.log(table.toString());
    
    let categories = [];
    readdirSync("./commands/").forEach((dir) => {
  
    const editedName = `${dir.toUpperCase()}`;
    const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
      file.endsWith(".js")
    );
  
      const cmds = commands.filter((command) => {
        let file = require(`../commands/${dir}/${command}`);
        return !file.hidden;
      }).map((command) => {
        let file = require(`../commands/${dir}/${command}`);
  
        if (!file.name) return "No command name.";
  
        let name = file.name.replace(".js", "");
        return `\`${name}\`\n`;
      });
  
      let data = new Object();
  
      data = {
        name: editedName,
        value: cmds.length === 0 ? "In progress." : cmds.join(" "),
      };
    categories.push(data);
  
    db.set(`cdm.${data.name}`, data.value)   
    })
}
