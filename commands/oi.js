const Discord = require('discord.js');

module.exports = {
    name: "oi",
    description: "Dê oi pro jotinha! :smiley: :smiley:",
    aliases: ['cumprimentar', 'ola'],
    type: 'Utilidades',
    args: false,

    async run (client, msg, args) {
    	const responses = [	
		"Oi! :smiley:",
		"Olá!",
		"Oi chuchu rsrs",
		"Koé :sunglasses:",
		"Oi gatinhx :smirk:"
		];
		const randomIndex = Math.floor(Math.random() * responses.length);
        msg.reply(`${responses[randomIndex]}`);
    }
}