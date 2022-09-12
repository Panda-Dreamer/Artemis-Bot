module.exports = {
  name: "Ping",
  description: "Reply pong to ping",
  execute: function command(client, interaction) {
    return new Promise(async (resolve, reject) => {
      try {
        await interaction.reply("Pong");
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
};
