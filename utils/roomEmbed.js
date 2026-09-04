const { EmbedBuilder } = require('discord.js');
const { truncate, getValidUrl } = require('./embedHelpers');

function buildRoomEmbeds(r) {
  const images = [r.Hinh1, r.Hinh2, r.Hinh3, r.Hinh4, r.Hinh5]
    .map(u => getValidUrl(u))
    .filter(Boolean);

  const detailUrl = getValidUrl(r.Link);
  const mapUrl = getValidUrl(r.Map);

  const mainEmbed = new EmbedBuilder()
    .setTitle(r.MSP || 'Phòng trọ')
    .setDescription(truncate(r.Content, 4096))
    .addFields(
      { name: 'Loại', value: r.Loai || 'N/A', inline: true },
      { name: 'Giá', value: r.Gia || 'N/A', inline: true },
      { name: 'Phòng trống', value: r.PhongTrong || '0', inline: true },
      { name: 'Tình trạng', value: r.Tinhtrang || 'N/A', inline: true },
      { name: 'Google Maps', value: mapUrl ? `[Xem bản đồ](${mapUrl})` : 'N/A', inline: true },
    )
    .setColor(0x2ecc71);

  if (detailUrl) mainEmbed.setURL(detailUrl);
  if (images[0]) mainEmbed.setImage(images[0]);

  const extraEmbeds = images.slice(1).map(url => {
    const embed = new EmbedBuilder().setImage(url);
    if (detailUrl) embed.setURL(detailUrl);
    return embed;
  });

  return [mainEmbed, ...extraEmbeds];
}

module.exports = { buildRoomEmbeds };