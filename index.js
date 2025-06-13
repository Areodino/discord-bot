require('dotenv').config()
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js')

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
})

const commands = [
  new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Replies with Hello!')
].map(command => command.toJSON())

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN)

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`)

  try {
    await rest.put(
  Routes.applicationGuildCommands(client.user.id, '1138455092425674922'),
  { body: commands }
)
    console.log('✅ Slash commands registered')
  } catch (err) {
    console.error(err)
  }
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === 'hello') {
    await interaction.reply('Hello!')
  }
})
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return

  console.log('Received command:', interaction.commandName) // 👈 Add this

  if (interaction.commandName === 'hello') {
    await interaction.reply('Hello!')
  }
})

client.login(process.env.DISCORD_TOKEN)

