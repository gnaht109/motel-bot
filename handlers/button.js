const { userSearchState } = require('../state');
const { buildSearchComponents, buildKeywordModal } = require('../components/searchComponents');

const FORM_URL = 'https://forms.gle/RmadJZAnP8fsVxKr6'; // dán link Form thật vào đây

async function handleButton(interaction) {
  // Nút "Tìm phòng trọ" trên panel cố định
  if (interaction.customId === 'panel_search') {
    userSearchState.set(interaction.user.id, {});

    await interaction.reply({
      content: 'Chọn tiêu chí tìm kiếm:',
      components: buildSearchComponents(),
      ephemeral: true,
    });
    return;
  }

  // Nút "Thêm phòng trọ" trên panel cố định
  if (interaction.customId === 'panel_add') {
    await interaction.reply({
      content: `📝 Vui lòng điền thông tin phòng trọ qua form sau:\n${FORM_URL}`,
      ephemeral: true,
    });
    return;
  }

  // Nút "Tìm kiếm" sau khi chọn xong dropdown
  if (interaction.customId === 'btn_search') {
    await interaction.showModal(buildKeywordModal());
    return;
  }
}

module.exports = { handleButton };