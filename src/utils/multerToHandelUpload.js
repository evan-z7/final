const multer = require('multer');
const moment = require('moment');
const MB = 1024 * 1024;
const path = require('path')
const date = moment().format('YYYY-MM-DD');
const imagePath = path.join(__dirname,'../../images')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    let fileExtension = '';
    if (file.originalname.split('.').length > 1) {
      fileExtension = file.originalname
    }
    const uniqueSuffix = `${date}-${Math.round(
      Math.random() * 1e9
    )}${fileExtension}`;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});
const upload = multer({
  storage,
  limits: {
    fileSize: 4 * MB
  },
  fileFilter (_req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb('error format');
    }
    cb(undefined, true);
  }
});

module.exports = {upload};
