const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require("dotenv")
dotenv.config()
const { APPID, TOKEN } = process.env
guildId = "585175254909845514"

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(APPID, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error)