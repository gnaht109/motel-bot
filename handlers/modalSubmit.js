const { getMotels } = require('../sheets');
const { userSearchState } = require('../state');
const { filterMotels } = require('../utils/filterMotels');
const { buildRoomEmbeds } = require('../utils/roomEmbed');

async function handleModalSubmit(interaction) {
  if (interaction.customId !== 'searchModal') return;

  await interaction.deferUpdate();

  const keyword = interaction.fields.getTextInputValue('keyword').trim().toLowerCase();
  const state = userSearchState.get(interaction.user.id) || {};

  const allMotels = await getMotels();
  const results = filterMotels(allMotels, { state, keyword });

  userSearchState.delete(interaction.user.id);

  if (results.length === 0) {
    await interaction.editReply({ content: 'Không tìm thấy phòng phù hợp.', embeds: [], components: [] });
    return;
  }

  const allEmbeds = results.slice(0, 2).flatMap(r => buildRoomEmbeds(r));

  await interaction.editReply({ content: null, embeds: allEmbeds, components: [] });
}

module.exports = { handleModalSubmit };