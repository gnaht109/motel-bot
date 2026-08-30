const { userSearchState } = require('../state');

async function handleSelectMenu(interaction) {
  const state = userSearchState.get(interaction.user.id) || {};

  if (interaction.customId === 'select_loai') state.loai = interaction.values[0];
  if (interaction.customId === 'select_gia') state.gia = interaction.values[0];
  // if (interaction.customId === 'select_phongtrong') state.phongtrong = interaction.values[0];

  userSearchState.set(interaction.user.id, state);

  await interaction.deferUpdate();
}

module.exports = { handleSelectMenu };