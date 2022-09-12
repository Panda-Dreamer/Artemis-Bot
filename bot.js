const djs = require("discord.js")
const denv = require("dotenv")
const fs = require('fs');
denv.config()



const client = new djs.Client({ intents: [djs.GatewayIntentBits.Guilds] });


//LOADING
client.interactions = {}
client.modules = {}

const commandFiles = fs.readdirSync("./interactions").filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./interactions/${file}`);
	client.interactions[command.name] = command
}

const moduleFiles = fs.readdirSync("./modules").filter(file => file.endsWith('.js'));
for (const file of moduleFiles) {
	const module = require(`./modules/${file}`);
	client.modules[module.name] = module
}



//HANDLER
client.once('ready', () => {
	console.log(`${client.user.tag} ready`);
});


client.on('interactionCreate',(interaction) => {
    if(interaction.isCommand() === true){

    }
})
client.login(process.env.TOKEN);