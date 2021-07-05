const Discord = require('discord.js')

module.exports = {
    name: "filter",
    description: "Adiciona filtros na música.",
    aliases:['filters', 'filtro', 'filtros'],
    usage: '[<filtro1> <filtro2> <...>]',
    example: 'off 3d bassboost echo karaoke nightcore vaporwave flanger gate haas reverse surround mcompand phaser tremolo earwax',
    type: 'DJ',
    inVoiceChannel: true,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg)
        if (!queue) return;
        if(args.length){
            const filter = args.map(x => x.toLowerCase());
            console.log(filter)

            if (filter.toString() === "off" && queue.filters.length){
                queue.setFilter(false)
                msg.channel.send(new Discord.MessageEmbed()
                        .setDescription(`Desligando todos os filtros.`)
                        .setColor(def_color));
            } 
            else{
                try{
                    for (let i = 0; i < filter.length; i++) queue.setFilter(filter[i]);
                    msg.channel.send(new Discord.MessageEmbed()
                        .setDescription(`Filtro atual: \`${queue.filters.length ? queue.filters : "Off"}\``)
                        .setColor(def_color));
                } 
                catch(err){
                }
            }
        }
        else return msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Filtro atual: \`${queue.filters.length ? queue.filters : "Off"}\``)
                    .setColor(def_color));
        

    }
}