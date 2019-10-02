const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'storage', 'uploads'),
        filename: (req, file, cb) => {

            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            cb(null, `${file.fieldname}-${name}-${Date.now()}${ext}`)
        },
    }),
};
