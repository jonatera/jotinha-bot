const Discord = require('discord.js')

module.exports = {
    name: "say",
    description: "Faz o Jotinhabot falar.",
    aliases: ['s'],
    usage: '[texto]',
    example: 'Leeroy Jeenkins',
    args: true,

    async run (client, msg, args) {
        let message;
        let textChannel = msg.mentions.channels.first()
        msg.delete()

        if(textChannel) {
            message = args.slice(1).join(" ");
            textChannel.send(message)
        } else {
            message = args.join(" ");
            msg.channel.send(message)
        }
    }
}