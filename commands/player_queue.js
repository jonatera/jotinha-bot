const pagination = require('../pagination.js');
const Discord = require('discord.js')

module.exports = {
    name: "queue",
    description: "Mostra a fila de músicas",
    aliases:['q', 'fila'],
    type: 'DJ',
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        let embed = [];
        var index = -1;
        for (let i = 0; i < queue.songs.length; i++) {
            if(i%10==0){
                index = index + 1;
                embed[index] = new Discord.MessageEmbed();
                    embed[index].setColor(def_color);
                    embed[index].setTitle(`Fila de músicas :musical_note:`);
                    embed[index].addField(`Tocando: :musical_note:`, `\`${queue.songs[i].formattedDuration}\` - *[${queue.songs[0].name}](${queue.songs[0].url})*`);
                    embed[index].addField(`Músicas`,`${queue.songs.length}`, true);
                    embed[index].addField(`Duração total`,`${queue.formattedDuration}`, true);
                    embed[index].addField(`\u200b`, `Volume: \`${queue.volume}%\` | Filtro: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "Toda a fila" : "Essa música" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``);
            }
            let string = ``;
            if(!(embed[index].description === null)) string = embed[index].description;
            string += `${i === 0 ? ":star: **Tocando:**" : ` \`${i}.\` `}${queue.songs[i].user} \`${queue.songs[i].formattedDuration}\` - [${queue.songs[i].name}](${queue.songs[i].url})\n`;
            embed[index].setDescription(string);
        }  
        
        
        
        const emojiList = ["⏪", "⏩"];
        const timeout = '120000';
        pagination(msg, embed, emojiList, timeout);
    }
}