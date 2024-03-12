import { Request } from "express";

const multer = require('multer');
const path = require('path');

// user.use(express.static('public'));

const storage = multer.diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        if (file.mimetype === 'image/jpeg'
            || file.mimetype === 'image/png') {
            cb(null, path.join(__dirname, '../public/image'));
        }
        else {
            cb(null, path.join(__dirname, '../public/document'));
        }
    },
    filename: function (req: Request, file: any, cb: any) {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.fieldname === "image") {
        (file.mimetype === 'image/jpeg'
            || file.mimetype === 'image/png')
            ? cb(null, true)
            : cb(null, false);
    }
    else if (file.fieldname === "document") {
        (file.mimetype === 'application/msword'
            || file.mimetype === 'application/pdf')
            ? cb(null, true)
            : cb(null, false);
    }
}

export const supplierUpload = multer({
    storage: storage,
    fileFilter: fileFilter
}).fields([{ name: 'document', maxCount: 1 }, { name: 'image', maxCount: 1 }]);