require('dotenv').config()
const Discord = require('discord.js')
const client = new Discord.Client({
     partials: ['MESSAGE']
});
client.login(process.env.BOT_TOKEN)
client.on("error", console.error);
client.on("ready", () => {
	console.log("Alo alo meu patrão bora trabaia");
})

/* command
	handler
		*/
		prefix = 'j.';
	 	def_color = "add8e6";
		const { readdirSync } = require('fs');
		const { join } = require('path');
		client.commands = new Discord.Collection();
		const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));
		for (const file of commandFiles) {
    			const command = require(join(__dirname, "commands", `${file}`));
   			 client.commands.set(command.name, command);
		}
		


/* commands
	 	*/
		client.on("message", async msg => {
			if(msg.author.bot) return;
			if(msg.channel.type === 'dm') return;

		     const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
			const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`, 'i');

		     if(prefixRegex.test(msg.content)){

		        const args = msg.content.slice(prefix.length).trim().split(/ +/g);

		        const commandName = args.shift().toLowerCase();
		        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

              	   if(!command) return;

                  if (command.args && !args.length) {
                  	let reply = `Tá faltando coisa aí, ${msg.author}!`;

                  	if (command.usage) {
                  		reply += `\n\nUso: \`${prefix}${command.name} ${command.usage}\``;
                  	}
                  	if (command.example) reply += `\nExemplo: \`${prefix}${command.name} ${command.example}\``;

                  	return msg.channel.send(new Discord.MessageEmbed()
			        .setDescription(`${reply}`)
			        .setColor(def_color));
                  	}

		        try {
		            command.run(client, msg, args);

		        } catch (error){
		            console.error(error);
		            msg.reply(`Deu ruim (${error})`)
		        }
		     }

		})

