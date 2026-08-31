require('dotenv').config();
const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
  new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Đăng bảng điều khiển phòng trọ (chỉ cần chạy 1 lần)')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // chỉ Admin thấy và dùng được
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

(async () => {
  await rest.put(
    Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
    { body: commands }
  );
  console.log('Slash commands registered.');
})();