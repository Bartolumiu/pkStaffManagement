const { EmbedBuilder } = require('discord.js');

const mongoose = require('mongoose');
const Guild = require('../../schemas/guild');

module.exports = {
    data: {
        name: 'claimbutton'
    },
    async execute(interaction, client) {
        /* Embeds */
        const embedPrevio = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom'})
            .setColor('Orange')
            .setTitle('Error')
            .setDescription(`No se te ha entregado el rol porque ya lo tenías.\n¡Gracias por apoyar al servidor!`)
            .setFooter({ text: 'BETA | Etiqueta - Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedFalse = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setColor('Red')
            .setTitle('Error')
            .setDescription(`¡Tu nombre de usuario no contiene la etiqueta del servidor!\nNo se te ha entregado el rol.\nNombre de usuario actual: ${interaction.user.username}#${interaction.member.user.discriminator}`)
            .addFields({ name: 'Sistema Experimental', value: 'Crees que ha sido un error? Crea un ticket siguiendo las instrucciones de <#866422035382140969> y te ayudaremos <:PKStaffManagement_EtiquetaTrue:1029773159844556800>'})
            .setFooter({ text: 'BETA | Etiqueta - Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedTrue = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setColor('Green')
            .setTitle('Rol entregado')
            .setDescription('¡Gracias por apoyar al servidor! <:PKStaffManagement_EtiquetaTrue:1029773159844556800>')
            .setFooter({ text: 'BETA | Etiqueta - Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        const embedNoRole = new EmbedBuilder()
            .setAuthor({ name: 'Pokémon Kingdom' })
            .setColor('Blurple')
            .setTitle('Error')
            .setDescription('No hay ningún rol configurado en el servidor como rol de servidor.')
            .setFooter({ text: 'BETA | Etiqueta - Pokémon Kingdom', iconURL: `${interaction.guild.iconURL({ dynamic: true }) || client.user.displayAvatarURL()}` })

        /* Base de datos */
        const guildProfile = await Guild.findOne({ guildId: interaction.guild.id });

        if (!guildProfile) {
            return interaction.reply({ embeds: [embedNoRole] });
        }

        /* Rol del servidor */
        const { roles } = interaction.member;
        const role = await interaction.guild.roles.fetch(guildProfile.serverRoleId);
        const nombreUser = interaction.user.username;

        /* Comprobaciones */ console.log(guildProfile.serverRoleId);
	    /* El rol está asignado */
	    if (guildProfile.serverRoleId == null) {
            console.log('No hay rol asignado');
            return interaction.reply({ embeds: [embedNoRole] });
        }
        /* Tiene el rol */
        if (roles.cache.has(guildProfile.serverRoleId)) {
            return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embedPrevio], ephemeral: true });
        }

        /* Tiene alguna de las etiquetas */
        const listaEtiquetas = ['PK', '|PK|', '|ᕈК|', '|ṖḲ|', '¦ƤḰ¦', '¦ṖҚ¦', '¦PK¦ツ', 'ᵖᵏ', 'ᵖk']
        for (const etiquetas of listaEtiquetas) {
            console.log(`Checking ${etiquetas} against ${nombreUser}`);
            if ((interaction.user.username).includes(etiquetas)) {
                await interaction.deferReply({ fetchReply: true, ephemeral: true });

                await roles.add(role).catch(console.error);
                console.log(`${etiquetas} was found!`);
                
		await client.channels.fetch;
                const channel = await client.channels.cache.get('1041332048838791188');
                channel.send({ content: `<@${interaction.user.id}>`, embeds: [embedTrue] });

                return interaction.editReply({ content: `<@${interaction.user.id}>`, embeds: [embedTrue], ephemeral: true });
            }
            console.log(`Nope. (${etiquetas})`);
        }

        /* No tiene la etiqueta del servidor */
        return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [embedFalse], ephemeral: true });
    }
}
