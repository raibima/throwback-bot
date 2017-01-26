const aws = require('aws-sdk');

let s3;
if (process.env.AWS_ACCESS_KEY && process.env.AWS_SECRET_KEY) {
  s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  });
} else {
  s3 = new aws.S3();
}

function getAvailablePhotos(bucketName) {
  return new Promise((resolve, reject) => {
    s3.listObjects({
      Bucket: bucketName,
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Contents.map(p => p.Key));
      }
    });
  })
}

function pickOneFromList(list) {
  return Promise.resolve(list[Math.floor(Math.random() * list.length)]);
}

function getPhotoUrl(bucketName, key) {
  return new Promise((resolve, reject) => {
    s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: key,
    }, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    })
  });
}

module.exports = {
  getAvailablePhotos,
  pickOneFromList,
  getPhotoUrl,
};
