const Discord = require('discord.js')

module.exports = {
    name: "shuffle",
    description: "Coloca as músicas que estão na fila em uma ordem aleatória",
    aliases:['random', 'randomize'],
    type: 'DJ',
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        try{
            queue.shuffle();
            msg.react('✅');
        }
        catch(err){
            msg.react('❌');
        }
    }
}

