const Discord = require('discord.js')

module.exports = {
    name: "resume",
    description: "Volta a tocar o bot pausado.",
    aliases:['unpause'],
    type: 'DJ',
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        queue.resume(msg);
            msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Tocando de novo :arrow_forward:`)
                    .setColor(def_color));
    }
}