import { uploadHeader } from "../middlewares/uploadHeader.js";
export const checkThenUpload = (req, res, next) => {
    if (req.body.image!=undefined){
        uploadHeader.single('image')
    }
}