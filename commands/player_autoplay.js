const Discord = require('discord.js')

module.exports = {
    name: "autoplay",
    description: "Faz o bot adicionar músicas automaticamente.",
    type: 'DJ',
    aliases:['aplay', 'auto'],
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        client.distube.toggleAutoplay(msg);
        msg.channel.send(new Discord.MessageEmbed("Modo autoplay está: `" + (mode ? "On" : "Off") + "` agora.")
                    .setDescription(``)
                    .setColor(def_color));
         
    }
}
