const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: "criarpersonagem",
    description: "Cria o seu personagem! :star:",
    aliases:['create', 'createcharacter', 'criar', 'createchar'],
    type: 'Games',

    async run (client, msg, args) {
        db.set(`${msg.author.id}.game.status.HP`, 18);
        db.set(`${msg.author.id}.game.status.MP`, 28);
    }
}
 		