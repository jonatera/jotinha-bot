const Discord = require('discord.js')

module.exports = {
    name: "previous",
    description: "Começa imediatamente a tocar a música anterior.",
    type: 'DJ',
    aliases:['prv', 'back', 'prev'],
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg)
        if (!queue) return;
        try {
            client.distube.previous(msg);
        } catch (error) {
            message.channel.send(`${error}`)
        }
    }
}

