require('dotenv').config()
const DisTube = require('distube');
const SpotifyPlugin = require("@distube/spotify")
const Discord = require('discord.js')
const client = new Discord.Client({
     partials: ['MESSAGE']
});
const distube = new DisTube(client, { searchSongs: true, emitNewSongOnly: true, leaveOnFinish: false, leaveOnEmpty: true, plugins: [new SpotifyPlugin({ parallel: true })]);

/* bot
	login
		*/
	prefix = 'j.';
	def_color = "add8e6";
	client.login(process.env.BOT_TOKEN)
	client.on("error", console.error);
	client.on("ready", () => {
		console.log("Alo alo meu patrão bora trabaia");
		client.user.setActivity({ type: "PLAYING", name: `${prefix}help` })
	})

/* command
	handler
		*/

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

		const status = queue => `Volume: \`${queue.volume}%\` | Filtro: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda a fila" : "Essa música" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``

		client.distube = distube;
		distube
		    .on("playSong", (msg, queue, song) => msg.channel.send(new Discord.MessageEmbed()
		    		   .setTitle(`Agora tocando: :musical_note:`)
		    		   .setImage(song.thumbnail)
			        .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
			        .addFields( 
			        	{ name: `:movie_camera: *${song.views.toLocaleString()}*`, value: `Adicionado por: ${song.user}`, inline: true },
			        	{ name: `:thumbsup: *${song.likes.toLocaleString()}*`, value: `:thumbsdown: *${song.dislikes.toLocaleString()}*`, inline: true },
			        	{ name: `Parâmetros: `, value: `${status(queue)}` },
			        )
			        .setFooter(`Digite ${prefix}stop para parar o bot, ${prefix}skip para pular essa música.`)
			        .setColor(def_color)
		        
		    ))
		    .on("addSong", (msg, queue, song) => msg.channel.send(new Discord.MessageEmbed()
			        .setDescription(`:white_check_mark: | ${song.user} colocou ${song.name} - \`${song.formattedDuration}\` na fila.`)
			        .setColor(def_color)
		    ))
		    .on("playList", (msg, queue, playlist, song) => msg.channel.send(new Discord.MessageEmbed()
		    		   .setTitle(`Playlist adicionada!: :musical_note::musical_note:`)
		    		   .setImage(song.thumbnail)
			        .setDescription(`Playlist [${playlist.name}](${playlist.url}) (${playlist.total_items} faixas)\n[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
			        .addFields( 
			        	{ name: `:movie_camera: *${song.views.toLocaleString()}*`, value: `Adicionado por: ${song.user}`, inline: true },
			        	{ name: `:thumbsup: *${song.likes.toLocaleString()}*`, value: `:thumbsdown: *${song.dislikes.toLocaleString()}*`, inline: true },
			        	{ name: `Parâmetros: `, value: `${status(queue)}` },
			        )
			        .setFooter(`Digite ${prefix}stop para parar o bot, ${prefix}skip para pular essa música.`)
			        .setColor(def_color)

		    ))
		    .on("addList", (msg, queue, playlist) => msg.channel.send(new Discord.MessageEmbed()
		    		   .setTitle(`Playlist adicionada!: :musical_note::musical_note:`)
			        .setDescription(`Playlist [${playlist.name}](${playlist.url}) (${playlist.total_items} faixas)`)
			        .setColor(def_color)
		        
		    ))

		    .on("searchResult", (msg, result) => {
		        let i = 0
		        msg.channel.send(new Discord.MessageEmbed()
			        .setDescription(`**Escolha uma das opções**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Escreva qualquer outra coisa ou espere 10 segundos para cancelar*`)
			        .setColor(def_color))
		    })

		    .on("searchCancel", msg => msg.channel.send(new Discord.MessageEmbed()
			        .setDescription(`Procura cancelada.`)
			        .setColor(def_color)))
		    .on("finish", msg => msg.channel.send(new Discord.MessageEmbed()
			        .setDescription(`Acabaram as músicas da fila.`)
			        .setColor(def_color)
		    	))
		    .on("error", (msg, err) => console.log(''))

