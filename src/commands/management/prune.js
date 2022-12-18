const { PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('prune')
		.setDescription('Elimina hasta 99 mensajes.')
		.addIntegerOption(option => option.setName('cantidad').setDescription('Cantidad de mensajes a eliminar'))
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	async execute(interaction) {
		const amount = interaction.options.getInteger('cantidad');


		if (amount <= 1 || amount > 99) {
			return interaction.reply({ content: 'Número no válido, debes poner un número entre 1 y 99.', ephemeral: true });
		}
		await interaction.channel.bulkDelete(amount, true).catch(error => {
			console.error(error);
			interaction.reply({ content: 'Hubo un error al intentar eliminar mensajes en este canal.', ephemeral: true });
		});

		return interaction.reply({ content: `\`${amount}\` mensajes eliminados correctamente.`, ephemeral: true });
	},
};