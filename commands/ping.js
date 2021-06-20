const Discord = require('discord.js')

module.exports = {
    name: "ping",
    description: "Testar o bot e latencia.",
    type: 'Bot',
    args: false,

    async run (client, msg, args) {
        msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Pong (${client.ws.ping}ms)`)
                    .setColor(def_color));
    }
}