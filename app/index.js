const LINEBot = require('line-messaging');
const getRandomPhotoFromS3 = require('../src/getRandomPhotoFromS3');

const bot = LINEBot.create({
  channelID: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelToken: process.env.CHANNEL_TOKEN,
});
bot.webhook('/webhook');
bot.on(LINEBot.Events.MESSAGE, function(replyToken, message) {
  if (message.getText() === '/throwback') {
    getRandomPhotoFromS3(process.env.BUCKET_NAME)
      .then(photo => {
        const image = new LINEBot.ImageMessageBuilder(photo, photo);
        return bot.replyMessage(replyToken, image);
      })
      .catch(console.log)
  }
});
bot.listen(process.env.PORT || 8080);
