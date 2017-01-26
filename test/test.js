const getRandomPhotoFromS3 = require('../src/getRandomPhotoFromS3');

getRandomPhotoFromS3(process.env.BUCKET_NAME || 'throwback-bot')
  .then(console.log);

  