require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const { handleSelectMenu } = require('./handlers/selectMenu');
const { handleButton } = require('./handlers/button');
const { handleModalSubmit } = require('./handlers/modalSubmit');
const { handleSetupPanel } = require('./handlers/setupPanel');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  try {
    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === 'setup') await handleSetupPanel(interaction);
    }
    else if (interaction.isStringSelectMenu()) {
      await handleSelectMenu(interaction);
    }
    else if (interaction.isButton()) {
      await handleButton(interaction);
    }
    else if (interaction.isModalSubmit()) {
      if (interaction.customId === 'searchModal') await handleModalSubmit(interaction);
    }
  } catch (err) {
    console.error(err);
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply({ content: '❌ Có lỗi xảy ra, thử lại sau.' }).catch(() => {});
    } else {
      await interaction.reply({ content: '❌ Có lỗi xảy ra, thử lại sau.', ephemeral: true }).catch(() => {});
    }
  }
});

client.login(process.env.BOT_TOKEN);