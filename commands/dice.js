const Discord = require('discord.js')
const DiceRoller = require('rpg-dice-roller');

module.exports = {
    name: "dice",
    description: "Rola os dadinho :game_die:",
    aliases:['d', 'rolls', 'r'],
    usage: '[<dados>d<quantidade> +/- <número>]',
    example: '2d20 + d8 - 4',
    type: 'Utilidades',

    async run (client, msg, args) {
        try{
            const dice = new DiceRoller.DiceRoller();
            if(!args.length) args[0] = 'd20';
            let roll = dice.roll(args.join(' ').toLowerCase());    
            let embed = new Discord.MessageEmbed();
                embed.setColor(def_color);
                embed.setTitle(`:game_die: Rolando dados :game_die:`)
                embed.addField(`Você rolou: *${roll.notation}*`, `${roll.rolls}`);
                embed.addField(`Resultado final: \`${roll.total}\`!`, `${100/(roll.maxTotal/roll.total)}% do valor máximo possível (${roll.maxTotal}).`);
            msg.channel.send(embed);
        } catch(error){
            console.log(error);
            msg.channel.send(new Discord.MessageEmbed()
                    .setDescription(`Uso: \`${this.usage}\`\nExemplo: \`${this.example}\``)
                    .setColor(def_color));
        }
    }
}