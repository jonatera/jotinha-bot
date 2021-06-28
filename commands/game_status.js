const Discord = require('discord.js');
const db = require('quick.db');
const pagination = require('../pagination.js');

module.exports = {
    name: "status",
    description: "Checa seus status, nível, dinheiro etc.",
    type: 'Games',

    async run (client, msg, args) {
        const status = db.get(`${msg.author.id}.game.status`);
        if(status !== null) {
            let embed = [];
            embed[0] = new Discord.MessageEmbed();
                embed[0].setColor(def_color);
                embed[0].setTitle(`Status de ${msg.author.tag}`);
                embed[0].setThumbnail(msg.author.displayAvatarURL({dynamic:true, size: 512}));
                embed[0].addField(`HP: ${status.HP}`,`MP: ${status.MP}`, true);
            pagination(msg, embed); 
        }
        else client.commands.get('criarpersonagem').run(client, msg, args);
    }
}