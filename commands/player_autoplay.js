const Discord = require('discord.js')

module.exports = {
    name: "autoplay",
    description: "Faz o bot adicionar músicas automaticamente.",
    type: 'DJ',
    aliases:['aplay', 'auto'],
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        /*const queue = client.distube.getQueue(msg);
        if (!queue) return;
        let mode = client.distube.toggleAutoplay(msg);
        msg.channel.send(new Discord.MessageEmbed()
                    .setDescription("Modo autoplay está: `" + (mode ? "On" : "Off") + "` agora.")
                    .setColor(def_color)); */
                    msg.channel.send(new Discord.MessageEmbed()
                    .setDescription("No momento indisponível.")
                    .setColor(def_color));
         
    }
}
