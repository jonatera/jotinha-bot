const Discord = require('discord.js')

module.exports = {
    name: "volume",
    description: "Ajusta o volume da música.",
    aliases:['v'],
    type: 'DJ',
    usage: '<valor 0~100>',
    example: '100',
    inVoiceChannel: true,
    args: true,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg)
        if (!queue) return;
        const volume = parseInt(args[0])
        if (isNaN(volume) || !(volume >= 0 && volume <= 100)) return msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Precisa ser um número de 0 a 100!`)
                    .setColor(def_color))
        client.distube.setVolume(msg, volume);
        msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Alterando o volume para \`${volume}\`.`)
                    .setColor(def_color))
    }
}