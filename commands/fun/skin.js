const { MessageEmbed } = require('discord.js')
const MinecraftAPI = require('minecraft-api');

module.exports = {
  name: "skin",
  category: "fun",
  description: "Obten la skin de un jugador premium!",
  run: async (client, message, args) => { 
    let skin = args.join(' ') //Nombre de la skin
    const user = message.mentions.users.first()

    if (!args[0]) { //Si no proporciona el nombre de la skin
      return message.channel.send("Dime el nombre de una skin") //Esto enviara un mensaje si no se envió el nombre de la skin
  }
    if (user) {
      return message.channel.send(`Por favor no mencione a ningun miembro del servidor.`)
  }
    const uuid = await MinecraftAPI.uuidForName(skin); 

    if (uuid === undefined) {
      return message.channel.send(`El jugador ***${skin}*** no existe o posiblemente no es **Premium**.`)
    }
    
    let crp = `https://crafatar.com/renders/body/${uuid}.png`;  //Esto sera la imagen de la skin
    let cbz = `https://crafatar.com/avatars/${uuid}`;
    let raw = `https://visage.surgeplay.com/skin/${uuid}.png`;
    
    
        const embed = new MessageEmbed()
        .setColor('#000000')
        .setTitle("`Skin RAW de "+skin+"`")
        .setURL(raw)
        .setThumbnail(cbz)
        .setImage(crp)
        
        message.channel.send(embed)
          
        }
    }