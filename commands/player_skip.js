const Discord = require('discord.js')

module.exports = {
    name: "skip",
    description: "Pula para a próxima música.",
    type: 'DJ',
    aliases:['sk', 'next'],
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg)
        if (!queue) return;
        try {
            queue.skip();
        } catch (error) {
            msg.channel.send(`${error}`)
        }
    }
}

