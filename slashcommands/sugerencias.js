const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports = {
  name: 'sugerencias',
  description: '¡Maneja las sugerencias!',
  options:[{
    name:'accion',
    description:'Elije si aceptas/denegas u pensaras la sugerencia.',
    type: 3,
    required: true,
    choices: [
      {
        name: "Aceptar",
        value: "aceptar"
      },
      {
        name: "Denegar",
        value: "denegar"
      },
      {
        name: "Neutra",
        value: "neutral"
      },
    ]
    },
  {
    name: "id",
    description: "Pon la ID de la sugerencia.",
    type: 4,
    required: true
  },
  {
    name: "razon",
    description: "Di el por que el status nuevo de la sugerencia.",
    type: 3,
    required: false
  }
  ],
  guilds: ['862010134091792425'], 
  async run({interaction, client, message, options}){

    let info = interaction.data.options
    const accion = info[0].value
    const id = info[1].value
    let razon = options.find(n => n.name === 'razon')

    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) { 
    return interaction.reply("No puedes usar el comando **Sugerencias**.", { flags: 64 }).then(m => { //Send the reply.
      setTimeout(() => { 
        m.delete();
      }, 5000);
   })  
}


      let sugerencia = await db.fetch(`sugerencia_${id}.sug`)
      let msgid = await db.fetch(`sugerencia_${id}.msgid`)
      let autor = await db.fetch(`sugerencia_${id}.tag`)
      let autorid = await db.fetch(`sugerencia_${id}.userid`)
      let canal = db.fetch(`suggestions_${interaction.guild.id}`)
      let ca = client.channels.cache.get(canal) 
      let thanos = client.users.fetch(autorid);
  thanos.then(function(autore) {

      let aceptar = new MessageEmbed()
      .setTitle(`**__Sugerencia Aceptada__**`)
      .setColor("#299438")
      .setDescription(sugerencia)
      .setFooter(`ID: #${id} • Ejecutado por ${autor}`, autore.displayAvatarURL({ dynamic: true, size: 1024 }));

      if (accion == 'aceptar') {
        if (razon === undefined) {
          razon = 'La idea es muy buena y ten por seguro que trataremos de incluirla!';
        } else {
          razon = options.find(n => n.name === 'razon').value
        }
        aceptar.addField("¿Por que fue aceptada?", `${razon}`)
        ca.messages.fetch(msgid).then(ca => {
          ca.reactions.removeAll()
          ca.edit(({ embed: aceptar }))
        })}
                        
      let denegar = new MessageEmbed()
      .setTitle(`**__Sugerencia Denegada__**`)
      .setColor("#DE1738")
      .setDescription(sugerencia)
      .setFooter(`ID: #${id} • Ejecutado por ${autor}`, autore.displayAvatarURL({ dynamic: true, size: 1024 }))

      if (accion == 'denegar') {
        if (razon === undefined) {
          razon = 'La idea es no es muy buena, piensa otra mejor!';
        } else {
          razon = options.find(n => n.name === 'razon').value
        }
        denegar.addField("¿Por que fue denegada?", `${razon}`)
        ca.messages.fetch(msgid).then(ca => {
          ca.reactions.removeAll()
          ca.edit(({ embed: denegar }))
        })}         
      
      let neutral = new MessageEmbed()
      .setTitle(`**__Sugerencia Neutral__**`)
      .setColor("#F8F32B")
      .setDescription(sugerencia)
      .setFooter(`ID: #${id} • Ejecutado por ${autor}`, autore.displayAvatarURL({ dynamic: true, size: 1024 }))

      if (accion == 'neutral') {
        if (razon === undefined) {
          razon = 'La idea tiene sus defectos como sus partes buenas, resubela con mejoras!';
        } else {
          razon = options.find(n => n.name === 'razon').value
        }
        neutral.addField("¿Por que fue puesta en neutro?", `${razon}`)
        ca.messages.fetch(msgid).then(ca => {
          ca.reactions.removeAll()
          ca.edit(({ embed: neutral }))
        })}
      });
          
      const hecho = new MessageEmbed()
        .setDescription(`La sugerencia **__\`#${id}\`__** de **${autor}** tiene un nuevo estatus correctamente.`)
        interaction.reply("", { embed: hecho})
    }
  }  
