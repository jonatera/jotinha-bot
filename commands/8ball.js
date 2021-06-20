const Discord = require('discord.js');

module.exports = {
    name: "ask",
    description: "Faz uma pergunta pro jotinha!",
    aliases: ['8ball', 'pergunta'],
    usage: '[pergunta]',
    example: 'no céu tem pão?',
    type: 'Utilidades',
    args: true,

    async run (client, msg, args) {
        const responses = [	
		"https://cdn.discordapp.com/attachments/844705593293013046/855127218715623440/RwLnTv4.jpeg",
		"https://cdn.discordapp.com/attachments/844705593293013046/855129881913720892/z50xp-1619719725-16226-list_items-no.jpg",
		"https://cdn.discordapp.com/attachments/844705593293013046/855133622163996734/Dx9cO5RX4AYo4wU.jpg",
		"Aham",
		"Nem fudendo, mano",
		"Sei lá",
		"Pergunta pra tua mãe aquela vagabunda sem cu",
		"Azideia man kkkkkj",
		"Eu acho que sim maluco",
		"Não.",
		"SIM SIM SIM SIM SIM",
		"OBVIO QUE NÃO MANO PUTA QU... pera na vdd sim mano",
		"NUNCA"

		];

		if(args!=0){
			const randomIndex = Math.floor(Math.random() * responses.length);
			if(randomIndex=='0' || randomIndex=='1' || randomIndex=='2'){
	        	embed = new Discord.MessageEmbed()
	       		.setTitle(`:8ball: *${args.join(' ')}* :8ball:`)
	       		.setImage(`${responses[randomIndex]}`)
	        	.setColor(def_color)
	        	msg.channel.send(embed);
			}
			else{
				const embed = new Discord.MessageEmbed()
	       		.setTitle(`:8ball: *${args.join(' ')}* :8ball:`)
	       		.setDescription(`${responses[randomIndex]}`)
	        	.setColor(def_color)
	        	msg.channel.send(embed);
			}
			

	        
		}
    }
}