const { userSearchState } = require('../state');
const { buildSearchComponents } = require('../components/searchComponents');

async function handleSlashCommand(interaction) {
  if (interaction.commandName !== 'search') return;

  userSearchState.set(interaction.user.id, {});

  await interaction.reply({
    content: 'Chọn tiêu chí tìm kiếm:',
    components: buildSearchComponents(),
    ephemeral: true,
  });
}

module.exports = { handleSlashCommand };