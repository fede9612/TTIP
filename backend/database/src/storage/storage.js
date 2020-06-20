const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.AWS_ACCES_KEY,
  accessKeyId: process.env.AWS_ACCES_KEY_ID,
  region: 'sa-east-1'
})

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'imgs-anydirec',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;