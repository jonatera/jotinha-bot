const Discord = require('discord.js')

module.exports = {
    name: "plays",
    description: "Procura e toca uma música ou link :musical_note:",
    aliases:['ps', 'pq'],
    usage: '[<link>]',
    example: 'Bilada Circulation',
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

