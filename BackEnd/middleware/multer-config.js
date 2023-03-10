// import
const multer = require('multer');

// objet pour extention
const MIME_TYPES = { 
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// création de l'objet storage avec fonction disque storage de multer
const storage = multer.diskStorage({ 
    destination: (req, file, callback) => { 
      callback(null, 'images');
    },
    filename: (req, file, callback) => { 
      const name = file.originalname.split(' ').join('_'); 
      const extension = MIME_TYPES[file.mimetype];  
      callback(null, name + Date.now() + '.' + extension); 
    }
});

// export de storage
module.exports = multer({storage: storage}).single('image'); 

