require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const commands = [
  new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  try {
    // Register commands globally (for all guilds)
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('✅ Slash commands registered');
  } catch (err) {
    console.error('❌ Command registration failed:', err);
  }
});
client.on('interactionCreate', async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;

    console.log(`Received command: ${interaction.commandName}`);

    if (interaction.commandName === 'hello') {
      await interaction.reply('Hello!');
    }
  } catch (error) {
    console.error('Interaction error:', error);
  }
});
client.on('messageCreate', (message) => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});
client.on('error', console.error);
client.login(process.env.DISCORD_TOKEN);
