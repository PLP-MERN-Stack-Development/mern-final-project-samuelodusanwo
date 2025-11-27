// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     console.log("File name: ", file)
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({storage: storage})

// module.exports = upload;



// middleware/upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

// ✅ USE .any() - ACCEPTS ANY FIELD NAME
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  }
}).any(); // ← THIS IS THE KEY FIX

module.exports = upload;