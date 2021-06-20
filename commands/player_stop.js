const Discord = require('discord.js')

module.exports = {
    name: "stop",
    description: "Para de tocar o DJ.",
    aliases:['ps', 'l', 'leave', 'disconnect'],
    type: 'DJ',
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        client.distube.stop(msg);
    }
}