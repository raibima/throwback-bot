const { getAvailablePhotos, getPhotoUrl, pickOneFromList } = require('./utils');

function getRandomPhotoFromS3(bucketName) {
  return (
    getAvailablePhotos(bucketName)
      .then(photos => pickOneFromList(photos))
      .then(photo => getPhotoUrl(bucketName, photo))
  );
}

module.exports = getRandomPhotoFromS3;
