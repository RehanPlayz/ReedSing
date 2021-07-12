const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
  name: "covid",
  category: "info",
  description: "Obten las estadisticas del Covid",
  usage: "covid all or jsonData <country>",
  aliases: ["covid19"],
  run: async (client, message, args) => {

    let link;
    let embed = new MessageEmbed()

    if (!args[0] || args[0].match(/all|global|globe|world/gi)) { //if country is not provided or the args contains all, global, globe or world string then execute the statement.
      let jsonData = await fetch("https://disease.sh/v3/covid-19/all")
      jsonData = await jsonData.json()
      embed
       .setTitle("Casos Globales")
           .setColor("GREEN")
           .setDescription("A veces, el número de casos puede diferir de una pequeña cantidad.")
           .addField("Casos Totales", jsonData.cases.toLocaleString(), true)
           .addField("Muertes Totales", jsonData.deaths.toLocaleString(), true)
           .addField("Recuperados Totales", jsonData.recovered.toLocaleString(), true)
           .addField("Casos de Hoy", jsonData.todayCases.toLocaleString(), true)
           .addField("Muertes de Hoy", jsonData.todayDeaths.toLocaleString(), true)
           .addField("Casos Activos", jsonData.active.toLocaleString(), true);
    } else {
      let jsonData = await fetch(`https://disease.sh/v3/covid-19/countries/${args.join(" ")}`)
      jsonData = await jsonData.json()

      if(!jsonData.country) return message.reply("No puedo conseguir el **" + args[0] + "** detalles.")

      embed.setTitle(`${jsonData.country.toUpperCase()}`)
           .setColor("GREEN")
           .setDescription("A veces, el número de casos puede diferir de una pequeña cantidad.")
           .setThumbnail(jsonData.countryInfo.flag || "")
           .addField("Casos Totales", jsonData.cases.toLocaleString(), true)
           .addField("Muertes Totales", jsonData.deaths.toLocaleString(), true)
           .addField("Recuperados Totales", jsonData.recovered.toLocaleString(), true)
           .addField("Casos de Hoy", jsonData.todayCases.toLocaleString(), true)
           .addField("Muertes de Hoy", jsonData.todayDeaths.toLocaleString(), true)
           .addField("Casos Activos", jsonData.active.toLocaleString(), true);
    }

    return message.channel.send(embed).catch(err => {
      return message.reply("Se produjo un error. Vuelve a intentarlo más tarde.")
    }) //send something lol

  }
}