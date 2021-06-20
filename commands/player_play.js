const Discord = require('discord.js')

module.exports = {
    name: "play",
    description: "Toca uma musica ou video de um link :musical_note:",
    aliases:['pr', 'ps'],
    usage: '[<link>]',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    type: 'DJ',
    inVoiceChannel: true,
    args: true,

    async run (client, msg, args) {
        if(!msg.member.voice.channel) return msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`${msg.author}, você não está em nenhum canal de voz!`)
                    .setColor(def_color));
        let search = args.join(" ");
        if(!search) return msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`${msg.author}, algo deu errado pra pesquisar isso...`)
                    .setColor(def_color));
        try{
            client.distube.options.searchSongs = true;
            client.distube.play(msg, search)
        }
        catch(error){
            return msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Deu ruim! ${error}`)
                    .setColor(def_color));
        }
    }
}

