import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './server/Version-1/uploadedFile');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname + 'uploadedWell');
  },
});

const theUploads = multer({
  storage: storage,
});

const InUploads = theUploads.fields([{ name: 'theImage', maxCount: 2 }, { name: 'theVideo', maxCount: 2 }]);

export default InUploads;
