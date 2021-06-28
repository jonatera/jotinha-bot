/* dependencies
			*/
	require('dotenv').config()
	const db = require('quick.db');
	const DisTube = require('distube');
	const SoundCloudPlugin = require("@distube/soundcloud");
	const SpotifyPlugin = require("@distube/spotify");
	const Discord = require('discord.js');
	const ytdl = require('ytdl-core');

	
/* environment
		objects
			*/
	const client = new Discord.Client({
	     partials: ['MESSAGE']
	});
	const distube = new DisTube.default(client, { 
							searchSongs: 5, leaveOnFinish: false, leaveOnEmpty: true, nsfw: true, searchCooldown: 10, updateYouTubeDL:false,
							plugins: [new SpotifyPlugin({ parallel: true }, new SoundCloudPlugin())]
						});
	 
/* bot
	login
		*/ 
	prefix = process.env.default_prefix; 
	def_color = "add8e6";
	client.login(process.env.BOT_TOKEN);
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
		        const [, matchedPrefix] = msg.content.match(prefixRegex);


		        const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/g);

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
			.on("initQueue", queue => {
			    queue.autoplay = true;
			    queue.volume = 100;
			})
		    .on("playSong", async (queue, song) => {
		    		    const curPage = await queue.textChannel.send(new Discord.MessageEmbed()
		    		   .setTitle(`Agora tocando: :musical_note:`)
		    		   .setImage(song.thumbnail)
			        .setDescription(`[${song.name}](${song.url}) - \`${song.formattedDuration}\``)
			        .addFields( 
			        	{ name: `:movie_camera: *${song.views.toLocaleString()}*`, value: `Adicionado por: ${song.user}`, inline: true },
			        	{ name: song.likes > 0 ? `:thumbsup: *${song.likes.toLocaleString()}*` : '\u200b', value: song.dislikes > 0 ? `:thumbsdown: *${song.dislikes.toLocaleString()}*`: '\u200b', inline: true },
			        	{ name: `Parâmetros: `, value: `${status(queue)}` },
			        )
			        .setFooter(`Digite ${prefix}help DJ para ver os comandos de música.`)
			        .setColor(def_color)

		    		   )
		    		    
				     let emojiList = ['⏪', '⏯️', '⏩'];
					for (const emoji of emojiList) await curPage.react(emoji);
					const reactionCollector = curPage.createReactionCollector(
						(reaction, user) => emojiList.includes(reaction.emoji.name) && !user.bot,
						{ time: song.duration*1010 }
					);
					reactionCollector.on('collect', reaction => {
						switch (reaction.emoji.name) {
							case emojiList[0]:
								try{
									distube.previous(queue);
									reactionCollector.stop();
								}
								catch(error){};
								break;
							case emojiList[1]:
							
								if(queue.paused) queue.resume(queue);
						        	else queue.pause(queue);
								break;
							case emojiList[2]:
								distube.skip(queue);
								reactionCollector.stop() ;
								break;
							default:
								break;
						}
						
					});
					reactionCollector.on('end', () => {
						if (!curPage.deleted) {
							curPage.reactions.removeAll();
						}
					});
					return curPage;   

		    })
		    .on("addSong", (queue, song) => queue.textChannel.send(new Discord.MessageEmbed()
			        .addFields({ name: `:white_check_mark: | ${song.name}\`[${song.formattedDuration}]\` agora está na fila.`, value: `Adicionado por: ${song.user}.\n\`${queue.songs.length}\` faixas na fila, \`${queue.formattedDuration}\` total.`})
			        .setColor(def_color)
		    ))
		    .on("addList", (queue, playlist) => queue.textChannel.send(new Discord.MessageEmbed()
		    		   .setTitle(`Playlist adicionada!: :musical_note::musical_note:`)
			        .setDescription(`Playlist [${playlist.name}](${playlist.url}) (${playlist.songs.length} faixas)`)
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
		    .on("finish", queue => queue.textChannel.send(new Discord.MessageEmbed()
			        .setDescription(`Acabaram as músicas da fila.`)
			        .setColor(def_color)
		    	))
		    .on("error", (msg, err) => console.log(err))

