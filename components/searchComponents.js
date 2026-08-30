const {
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

function buildSearchComponents() {
  const loaiSelect = new StringSelectMenuBuilder()
    .setCustomId('select_loai')
    .setPlaceholder('Loại phòng')
    .addOptions(
      { label: 'Có gác', value: 'Có gác' },
      { label: 'Studio', value: 'Studio' }
    );

  const giaSelect = new StringSelectMenuBuilder()
    .setCustomId('select_gia')
    .setPlaceholder('Mức giá tối đa')
    .addOptions(
      { label: 'Dưới 2.000.000', value: '2000000' },
      { label: 'Dưới 3.000.000', value: '3000000' },
      { label: 'Dưới 4.000.000', value: '4000000' },
      { label: 'Dưới 5.000.000', value: '5000000' },
      // { label: 'Dưới 6.000.000', value: '6000000' }
    );

  // const phongTrongSelect = new StringSelectMenuBuilder()
  //   .setCustomId('select_phongtrong')
  //   .setPlaceholder('Số phòng trống')
  //   .addOptions(
  //     { label: '≥ 1', value: '1' },
  //     { label: '≥ 2', value: '2' },
  //     { label: '≥ 3', value: '3' },
  //     { label: '≥ 4', value: '4' },
  //     { label: '≥ 5', value: '5' }
  //   );

  const searchButton = new ButtonBuilder()
    .setCustomId('btn_search')
    .setLabel('Tìm kiếm')
    .setStyle(ButtonStyle.Primary);

  return [
    new ActionRowBuilder().addComponents(loaiSelect),
    new ActionRowBuilder().addComponents(giaSelect),
    // new ActionRowBuilder().addComponents(phongTrongSelect),
    new ActionRowBuilder().addComponents(searchButton),
  ];
}

function buildKeywordModal() {
  const modal = new ModalBuilder()
    .setCustomId('searchModal')
    .setTitle('Từ khóa tìm kiếm');

  const keywordInput = new TextInputBuilder()
    .setCustomId('keyword')
    .setLabel('Từ khóa (không bắt buộc)')
    .setStyle(TextInputStyle.Short)
    .setRequired(false);

  modal.addComponents(new ActionRowBuilder().addComponents(keywordInput));
  return modal;
}

module.exports = { buildSearchComponents, buildKeywordModal };