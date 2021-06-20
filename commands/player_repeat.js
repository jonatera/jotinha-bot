const Discord = require('discord.js')

module.exports = {
    name: "repeat",
    description: "Faz o bot repetir a música ou fila.",
    type: 'DJ',
    aliases:['loop', 'rp'],
    usage: '[off, song, queue]',
    example: 'queue',
    inVoiceChannel: true,
    args: true,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        let mode = null;
        switch (args[0]) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        mode = client.distube.setRepeatMode(msg, mode);
        mode = mode ? mode === 2 ? "Toda a fila" : "Essa música" : "Off";
        msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`:white_check_mark: Agora o modo de repetição está em: \`${mode}\``)
                    .setColor(def_color));
    }
}
