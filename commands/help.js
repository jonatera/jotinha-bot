const Discord = require('discord.js')

module.exports = {
    name: "help",
    description: "Mostra os comandos do Jotinhabot.",
    aliases: ['commands', 'comandos', 'ajuda'],
    usage: '[comando]',
    example: 'ping',

    async run (client, msg, args) {
        const { commands } = client;
        const data = [];
        let embed = new Discord.MessageEmbed();
        embed.setColor(def_color);

        if (!args.length) {
            embed.setTitle('Comandos do Jotinha!');
            embed.setDescription(`Digite \`${prefix}[comando]\` para usá-lo. Você pode digitar \`${prefix}help [comando]\` para procurar ajuda sobre um comando específico.`)
            for(const element of commands.map(command => command.name)){
                const command = commands.get(element) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(element));
                embed.addField(`\`${element}\``,`*${command.description}*`,true);
            }           
        }
        else {
            const command = commands.get(args[0]) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
            if (typeof command === 'undefined') {
                embed.description = `Esse comando não existe!`;
                return msg.channel.send({embed: embed});
            }
            embed.setTitle(`Comando \`${args.join(' ')}\``);
            embed.addField(`*${command.description}*`,'\u200b');

            if (command.aliases) embed.addField('Alternativas: ', `__${command.aliases.join('__, __')}__`);
            if (command.usage) embed.addField('Uso: ',`\`${prefix}${command.name} ${command.usage}\``);
                else embed.addField('Uso: ',`\`${prefix}${command.name}\``);
            if (command.example) embed.addField('Exemplo: ',`\`${prefix}${command.name} ${command.example}\``);
                else embed.addField('Exemplo: ',`\`${prefix}${command.name}\``);
            
        }

        msg.channel.send({embed: embed});
    }
}