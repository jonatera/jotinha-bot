const Discord = require('discord.js')
const db = require('quick.db');

module.exports = {
    name: "removerpersonagem",
    description: "Destrói seu personagem, dinheiro e itens.",
    aliases:['destroycharacter', 'removechar', 'removecharacter', 'destroycharacter', 'deletechar', 'deletecharacter'],
    type: 'Games',

    async run (client, msg, args) {
        db.delete(`${msg.author.id}`);
    }
}
 		