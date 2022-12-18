module.exports = {
    data: {
        name: 'postulacion_staff'
    },
    async execute(interaction, client) {
        const testVar = interaction.fields.getTextInputValue('testVar');
        await interaction.reply({ content: testVar, ephemeral: true })
    }
}
