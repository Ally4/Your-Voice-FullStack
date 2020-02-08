import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './server/Version-2/uploadedFile');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname + 'uploadedWell');
  },
});

const theUploads = multer({
  storage: storage,
});

const InUploads = theUploads.fields([{ name: 'images', maxCount: 2 }, { name: 'videos', maxCount: 2 }]);

export default InUploads;
