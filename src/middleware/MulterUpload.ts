import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Myploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
});
  
const uploads = multer();

  export default uploads