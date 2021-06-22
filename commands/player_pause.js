const Discord = require('discord.js')

module.exports = {
    name: "pause",
    description: "Pausa a música que está tocando.",
    type: 'DJ',
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        if(queue.paused){
            queue.resume(msg);
            msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Tocando de novo :arrow_forward:`)
                    .setColor(def_color));
        }
        queue.pause(msg);
        msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Interrompendo a música :pause_button:`)
                    .setColor(def_color));
    }
}