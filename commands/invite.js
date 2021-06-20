const Discord = require('discord.js');

module.exports = {
    name: "invite",
    description: "Envia o convite do Jotinhabot pro seu servidor :sunglasses:",
    type: 'Bot',
    args:false,

    async run (client, msg, args) {
        msg.channel.send(new Discord.MessageEmbed()
        .setColor(def_color)
        .setTitle('Link do bot maravilindo :sunglasses:')
        .setDescription('https://discord.com/api/oauth2/authorize?client_id=854751948670369833&permissions=8&scope=bot')
        );
    }
}