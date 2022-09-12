module.exports = {
  name: "Ping",
  description: "Reply pong to ping",
  execute: function command(client, interaction) {
    return new Promise(async (resolve, reject) => {
      try {
        client.modules.ImageAnswers.info("Pong!").then((img) => {
          interaction.reply({files: [img]})
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
};
