const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const creds = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  bucket: process.env.AWS_BUCKET
};
const s3 = new aws.S3(creds);
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET,
    acl: "private",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    storageClass: "STANDARD_IA",
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      //Set name of file to original file name from client
      cb(null, "images/movies/" + file.originalname.toString());
    }
  })
}).single("imageName");

module.exports = upload;
