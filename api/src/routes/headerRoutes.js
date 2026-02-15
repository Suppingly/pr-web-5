import { Router } from "express";
import headersController from "../controllers/headerController.js";
import { checkThenUpload } from "../middlewares/preuploadHeader.js";
import { authMiddlewareAlt } from "../middlewares/authMiddleware.js";
import { uploadHeader } from "../middlewares/uploadHeader.js";

const router = Router()

router.post('/',uploadHeader.single('image'),authMiddlewareAlt,headersController.create)
router.get('/',authMiddlewareAlt,headersController.getAllByUser)
router.put('/:id',/*checkThenUpload*/uploadHeader.single('image'),authMiddlewareAlt,headersController.update)
router.delete('/:id',authMiddlewareAlt,headersController.delete)

export default router