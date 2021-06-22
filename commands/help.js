const pagination = require('../pagination.js')
const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "Mostra os comandos do Jotinhabot.",
    aliases: ['commands', 'comandos', 'ajuda'],
    usage: '[comando]',
    example: 'ping',
    type: 'Utilidades',

    async run (client, msg, args) {
        const { commands } = client;
        let embed = [];

            for(const element of commands.map(command => command.name)){
                const command = commands.find(cmd => cmd.name.includes(element));

                if(embed[command.type] === undefined){
                    embed[command.type] = new Discord.MessageEmbed();
                    embed[command.type].setColor(def_color);
                    embed[command.type].setTitle('Comandos do Jotinha!');
                    embed[command.type].setDescription(`Digite \`${prefix}[comando]\` para usá-lo. Você pode digitar \`${prefix}help [comando]\` para procurar ajuda sobre um comando específico.`);
                    embed[command.type].addField('\u200b',`**Comandos de \`${command.type}\`:**`);
                }

                embed[command.type].addField(`\`${element}\``,`*${command.description}*`,true);
            }

            let entries = Object.keys(embed);

        if (!args.length || entries.includes(args[0])) {
            
            let dummy = [];
            let page;
            for (let i = 0; i < Object.keys(embed).length; i++) {
                if(args[0] === entries[i]) page = i;
                dummy[i] = embed[entries[i]];
            }
            
            const emojiList = ["⏪", "⏩"];
            const timeout = '120000';

            pagination(msg, dummy, emojiList, timeout, page);          
        }
        else {
            embed[0] = new Discord.MessageEmbed();
            embed[0].setColor(def_color);
            const command = commands.get(args[0]) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            if (typeof command === 'undefined') {
                embed[0].description = `Esse comando não existe!`;
                return msg.channel.send({embed: embed[0]});
            }
            embed[0].setTitle(`Comando \`${command.name}\``);
            embed[0].addField(`*${command.description}*`,'\u200b');

            if (command.aliases) embed[0].addField('Alternativas: ', `__${command.aliases.join('__, __')}__`);
            if (command.usage) embed[0].addField('Uso: ',`\`${prefix}${command.name} ${command.usage}\``);
                else embed[0].addField('Uso: ',`\`${prefix}${command.name}\``);
            if (command.example) embed[0].addField('Exemplo: ',`\`${prefix}${command.name} ${command.example}\``);
                else embed[0].addField('Exemplo: ',`\`${prefix}${command.name}\``);
            msg.channel.send({embed: embed[0]});
        }

        
    }
}