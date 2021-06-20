const Discord = require('discord.js')

module.exports = {
    name: "remove",
    description: "Remove uma ou mais músicas da fila.",
    type: 'DJ',
    aliases:['rem', 'rm'],
    usage: '[música]',
    example: '8 10 11',
    inVoiceChannel: true,
    args: true,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        console.log(args);
        for (let i = 0; i < args.length; i++) {
             queue.songs.splice(parseInt(args[i]),1);
        }

        
        
    }
}
