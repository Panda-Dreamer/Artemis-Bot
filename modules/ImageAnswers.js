const Canvas = require("@napi-rs/canvas");
const djs = require("discord.js");

const dimensions = {
  small: {
    x: 4400,
    y: 874,
  },
};

const texts = {
  title: {
    x: 90,
    y: 275,
    fontSize: 350,
  },
  subtitle: {
    x: 250,
    y: 700,
    fontSize: 300,
  },
  text: {
    x: 250,
    y: 550,
    fontSize: 500,
  },
};

//UTILITY
const applyText = (canvas, text, size) => {
  const context = canvas.getContext("2d");
  let fontSize = size;
  do {
    context.font = `${(fontSize -= 10)}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);
  return context.font;
};

moduleData = {
  name: "ImageAnswers",
};

moduleData.small = async function small(titleText, subtitleText) {
  return new Promise(async (resolve, reject) => {
    const canvas = Canvas.createCanvas(dimensions.small.x, dimensions.small.y);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage("assets/quick.png");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.font = applyText(canvas, "[" + titleText + "]", texts.title.fontSize);
    context.fillStyle = "#ffffff";
    context.fillText("[" + titleText + "]", texts.title.x, texts.title.y);

    context.font = applyText(canvas, subtitleText, texts.subtitle.fontSize);
    context.fillStyle = "#ffffff";
    context.fillText(subtitleText, texts.subtitle.x, texts.subtitle.y);

    resolve(new djs.AttachmentBuilder(await canvas.encode("png"), { name: "small.png" }));
  });
};

moduleData.info = async function small(text) {
  return new Promise(async (resolve, reject) => {
    const canvas = Canvas.createCanvas(dimensions.small.x, dimensions.small.y);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage("assets/quick.png");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.font = applyText(canvas, text, texts.text.fontSize);
    context.fillStyle = "#ffffff";
    context.fillText(text, texts.text.x, texts.text.y);

    resolve(new djs.AttachmentBuilder(await canvas.encode("png"), { name: "small.png" }));
  });
};

module.exports = moduleData;
