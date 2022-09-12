const Canvas = require("@napi-rs/canvas");

const dimensions = {
  small: {
    x: 4400,
    y: 874,
  },
};

const texts = {
    title:{
        x: 110,
        y: 230,
        fontSize: 70
    },
    subtitle:{
        x: 140,
        y: 350,
        fontSize: 55
    }
}

//UTILITY
const applyText = (canvas, text,size) => {
  const context = canvas.getContext("2d");
  let fontSize = size;
  do {
    context.font = `${(fontSize -= 10)}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);
  return context.font;
};

moduleData = {
    name:"ImageAnswers"
};

moduleData.small = async function small(titleText,subtitleText) {
  return new Promise(async (resolve, reject) => {
    const canvas = Canvas.createCanvas(dimensions.small.x, dimensions.small.y);
    const context = canvas.getContext("2d");
    const background = await Canvas.loadImage("/assets/quick.png");
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.font = applyText(canvas, titleText,  texts.title.size);
	context.fillStyle = '#ffffff';
	context.fillText(titleText, texts.title.x,  texts.title.y);

    context.font = applyText(canvas, subtitleText,  texts.subtitle.size);
	context.fillStyle = '#ffffff';
	context.fillText(subtitleText, texts.subtitle.x,  texts.subtitle.y);

    resolve(new AttachmentBuilder(await canvas.encode('png'), { name: 'small.png' }))
  });
};

module.exports = moduleData;
