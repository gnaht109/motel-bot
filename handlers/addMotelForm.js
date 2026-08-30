const FORM_URL = 'https://forms.gle/RmadJZAnP8fsVxKr6'; // dán link Google Form thật vào đây

async function handleAddMotelForm(interaction) {
  if (interaction.commandName !== 'them-phong') return;

  await interaction.reply({
    content: `📝 Vui lòng điền thông tin phòng trọ qua form sau:\n${FORM_URL}`,
    ephemeral: true,
  });
}

module.exports = { handleAddMotelForm };