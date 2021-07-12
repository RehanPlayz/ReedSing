const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
  name: 'configuracion',
  description: 'Modifica la config del bot, solo administradores.',
  guilds: ['862010134091792425'], 
  options: [
    {
      name: "setup",
      description: "Haz la setup del bot, solo administradores.",
      type: 2, // 2 is type SUB_COMMAND_GROUP
      options: [
          {
              name: "canales",
              description: "Setup de los canales.",
              type: 1, // 1 is type SUB_COMMAND
              options: [
                {
                    name: "opciones",
                    description: "Elije el setup de canal que haras.",
                    type: 3,
                    required: true,
                    choices: [
                      {
                       name: "Bienvenida",
                       value: "welcome"
                      },
                      {
                       name: "Logs",
                       value: "logs"
                      },
                      {
                        name: "LevelUp",
                        value: "levelup"
                      },
                      {
                        name: "Sugerencias",
                        value: "suggestions"
                      },
                      {
                        name: "Noticias",
                        value: "notice"
                      },
                      {
                        name: "Spoilers",
                        value: "spoilers"
                      },
                      {
                        name: "Reglas",
                        value: "rules"
                      },
                      {
                        name: "Actualizaciones",
                        value: "updates"
                      },                                       
                    ]                
                  },
                {
                    name: "canal",
                    description: "Dime que canal elegiras.",
                    type: 7,
                    required: true
                }
             ]
          },
          {
              name: "roles",
              description: "Setup de los roles.",
              type: 1,
              options: [
                {
                    name: "opciones",
                    description: "Elije el setup de rol que haras.",
                    type: 3,
                    required: true,
                    choices: [
                      {
                       name: "UserRole",
                       value: "user"
                      },
                      {
                       name: "MuteRole",
                       value: "mute"
                      }
                    ]               
                  },
                {
                    name: "role",
                    description: "Dime que rol elegiras.",
                    type: 8,
                    required: true
                }
             ]
          }
       ]
     },
  ],
  run: async ({interaction, options}, message) => {

    let info = interaction.data.options
    console.log(info)
    const accion = options.find(n => n.name === 'setup').options[0].options[0].value
    const valor = options.find(n => n.name === 'setup').options[0].options[1].value

    if (!interaction.member.permissions.has('ADMINISTRATOR')) { 
    return interaction.reply("No puedes usar el comando **Setup**.", { flags: 64 }).then(m => {
      setTimeout(() => { 
        m.delete();
      }, 5000);
   })  
}

      if (accion == 'user') {
        if (!interaction.guild.roles.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un role o no existe.", { flags: 64 })
        }

        db.set(`userrole_${interaction.guild.id}`, valor)
        let rol =  interaction.guild.roles.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Role de Usuarios** y su nuevo valor es ${rol}.`)
        return interaction.reply("", { embed: hecho})
      }                   

      if (accion == 'mute') {
        if (!interaction.guild.roles.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un role o no existe.", { flags: 64 })
        }

        interaction.guild.channels.cache.forEach(async (channel, id) => {
          await channel.createOverwrite(valor, {
             SEND_MESSAGES: false,
             MANAGE_MESSAGES: false,
             READ_MESSAGES: false,
             ADD_REACTIONS: false
          });
       });

        db.set(`muterole_${interaction.guild.id}`, valor)
        let rol =  interaction.guild.roles.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Role de Muteos** y su nuevo valor es ${rol}.`)
        return interaction.reply("", { embed: hecho})
      }         

       if (accion == 'welcome') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
       }

        db.set(`welchannel_${interaction.guild.id}`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de Bienvenidas** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})
      }
      
       if (accion == 'levelup') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
       }

        db.set(`levelchannel_${interaction.guild.id}`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de LevelUp** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})

      }

      if (accion == 'logs') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
        }

        db.set(`logs`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de Logs** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})
      }
      
      if (accion == 'suggestions') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
        }

        db.set(`suggestions_${interaction.guild.id}`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de Sugerencias** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})
      }

      if (accion == 'notice') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
       }

        db.set(`noticechannel_${interaction.guild.id}`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de Noticias** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})

      }

      if (accion == 'spoilers') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
       }

        db.set(`spoilerschannel_${interaction.guild.id}`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de Spoilers** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})

      }

      if (accion == 'rules') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
       }

        db.set(`ruleschannel_${interaction.guild.id}`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de Reglas** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})

      }

      if (accion == 'updates') {
        if (!interaction.guild.channels.cache.find(x => x.id === valor)) {
          return interaction.reply("El valor dado no es un canal o no existe.", { flags: 64 })
       }

        db.set(`updateschannel_${interaction.guild.id}`, valor)
        let canal =  interaction.guild.channels.cache.get(valor);

        const hecho = new MessageEmbed()
        .setDescription(`Se a actualizado la configuracion de **Canal de Actualizaciones** y su nuevo valor es ${canal}.`)
        return interaction.reply("", { embed: hecho})

      }
  }
}  