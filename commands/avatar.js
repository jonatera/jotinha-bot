const Discord = require('discord.js');

module.exports = {
    name: "avatar",
    description: "Mostra os avatares maravilhosos das pessoas :heart:",
    usage: '[<membro>]',

    async run (client, msg, args) {
        let member = msg.mentions.users.first() || msg.author
        let avatar = member.displayAvatarURL({dynamic:true, size: 1024})
        const embed = new Discord.MessageEmbed()
        .setTitle(`Avatar de ${member.tag}`)
        .setDescription(`[Link do avatar](${avatar})`)
        .setImage(avatar)
        .setColor(def_color)

        msg.channel.send(embed);
    }
}