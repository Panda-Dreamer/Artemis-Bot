const djs = require("discord.js");
const denv = require("dotenv");
const fs = require("fs");
denv.config();

const client = new djs.Client({ intents: [djs.GatewayIntentBits.Guilds] });

//LOADING
client.interactions = {};
client.modules = {};

const commandFiles = fs.readdirSync("./interactions").filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./interactions/${file}`);
  client.interactions[command.name.toLowerCase()] = command;
}

const moduleFiles = fs.readdirSync("./modules").filter((file) => file.endsWith(".js"));
for (const file of moduleFiles) {
  const module = require(`./modules/${file}`);
  client.modules[module.name] = module;
}

//HANDLER
client.once("ready", () => {
  console.log(`${client.user.tag} ready`);
});

client.on("interactionCreate", (interaction) => {
  if (interaction.isCommand() != true) {
    return;
  }

  const command = client.interactions[interaction.commandName];
  if (!command) {
    interaction.reply({ ephemral: true, content: "Command not found" });
  } else {
    command.execute(client, interaction).catch((err) => {
      console.log(err);
      interaction.reply({ ephemral: true, content: `Whoops an error occured: \n \`${err.toString()}\`` });
    });
  }
});
client.login(process.env.TOKEN);
