const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

async function handleSetupPanel(interaction) {
  if (interaction.commandName !== 'setup') return;

  const embed = new EmbedBuilder()
    .setTitle('🏠 Phòng trọ DKCT')
    .setColor(0x5865f2);

  const searchBtn = new ButtonBuilder()
    .setCustomId('panel_search')
    .setLabel('🔍 Tìm phòng trọ')
    .setStyle(ButtonStyle.Primary);

  const addBtn = new ButtonBuilder()
    .setCustomId('panel_add')
    .setLabel('➕ Thêm phòng trọ')
    .setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(searchBtn, addBtn);

  await interaction.reply({ embeds: [embed], components: [row] });
}

module.exports = { handleSetupPanel };