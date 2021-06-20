const Discord = require('discord.js')

module.exports = {
    name: "jump",
    description: "Pula para a música escolhida na fila",
    aliases:['jmp'],
    usage: '[posição]',
    example: '2',
    type: 'DJ',
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        client.distube.jump(msg, parseInt(args[0]));
    }
}

