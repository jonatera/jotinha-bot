const Discord = require('discord.js')

module.exports = {
    name: "autoplay",
    description: "Faz o bot adicionar músicas automaticamente.",
    type: 'DJ',
    aliases:['aplay', 'auto'],
    inVoiceChannel: true,
    args: false,

    async run (client, msg, args) {
        const queue = client.distube.getQueue(msg);
        if (!queue) return;
        if(queue.autoplay){
            client.distube.toggleAutoplay('off');
            msg.channel.send(new Discord.MessageEmbed(`Parando de adicionar músicas automaticamente.`)
                    .setDescription(``)
                    .setColor(def_color));
        } 
        else{
            client.distube.toggleAutoplay('on');
            msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Adicionando músicas automaticamente a partir de agora.`)
                    .setColor(def_color));
        }
        
    }
}
