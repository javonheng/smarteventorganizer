const express = require('express');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const cors = require('cors')
const router = require('express').Router() //express router
const app = express();

// Middleware
app.use(express.json());
app.use(cors())
app.use(methodOverride('_method'));

// Mongo URI
const mongoURI = 'mongodb+srv://javonheng:javonheng@smarteventorganizer-okapp.mongodb.net/test?retryWrites=true&w=majority';

// Create mongo connection
const conn = mongoose.createConnection(mongoURI || process.env.MONGODB_URI, {useNewUrlParser: true, useCreateIndex: true});

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// @route GET /
// @desc Loads form
router.route('/2').get((req, res) => {
  try {
    gfs.files.find().toArray((err, files) => {
      console.log(files)
      res.send(files)
      res.render({files: files})
    })
  } catch (err) {
    return next(err)
  }
  /*gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      res.render('index', { files: false });
    } else {
      files.map(file => {
        if (
          file.contentType === 'image/jpeg' ||
          file.contentType === 'image/png'
        ) {
          file.isImage = true;
        } else {
          file.isImage = false;
        }
      });
      res.render('index', { files: files });
    }
  });*/
})

// @route POST /upload
// @desc  Uploads file to DB
router.post('/upload2', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send('ok')
  //res.json({ file: req.file });
  //res.redirect('/');
});

// @route GET /files
// @desc  Display all files in JSON
router.route('/files2').get((req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
    const readstream = gfs.createReadStream(files.filename);
    readstream.pipe(res);
    const bufs = [];
    readstream.on('data', function (chunk) {
      bufs.push(chunk);
    });
    readstream.on('end', function () {
      const fbuf = Buffer.concat(bufs);
      const base64 = fbuf.toString('base64');
      console.log(base64);
      res.render('index', {image: base64})
    });
  });
});

// @route GET /files/:filename
// @desc  Display single file object
router.route('/files2/:filename').get((req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    //return res.json(file);
  });
});

// @route GET /image/:filename
// @desc Display Image
router.route('/image2/:filename').get((req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.route('/files2/:id').delete((req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.redirect('/');
  });
});

module.exports = router
//const port = process.env.PORT || 4000;
//app.listen(port, () => console.log(`Server started on port ${port}`));
