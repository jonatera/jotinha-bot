const Discord = require('discord.js')

module.exports = {
    name: "filter",
    description: "Adiciona filtros na música.",
    aliases:['filters'],
    usage: '[<filters>]',
    example: '3d, bassboost, echo, karaoke, nightcore, vaporwave, flanger, gate, haas, reverse, surround, mcompand, phaser, tremolo, earwax',
    type: 'DJ',
    inVoiceChannel: true,
    args: true,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg)
        if (!queue) return;
        if (args[0] === "off" && queue.filter) client.distube.setFilter(msg, queue.filter)
        else if (Object.keys(client.distube.filters).includes(args[0])) client.distube.setFilter(msg, args[0])
        else if (args[0]) return msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Esse filtro não existe!`)
                    .setColor(def_color));
        msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Filtro atual: \`${queue.filter || "Off"}\``)
                    .setColor(def_color));

    }
}