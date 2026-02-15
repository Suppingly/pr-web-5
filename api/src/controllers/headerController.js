import { existsSync, unlink } from "fs";
import headerService from "../services/headerService.js";
class HeaderController {
    async create(req,res,next){
        try {
            const { title }=req.body
            const { desc }=req.body
            const { category }=req.body
            const { author }=req.body
            const image = `/uploads/headers/${req.file.filename}`
            const user = req.user.id
            const header = await headerService.create({ title,desc,category,image,user,author })
            res.json(header)
        } catch (err){
            next(err)
        }
    }
    async getAll(req,res,next){
        try{
            const headers = await headerService.getAll()
            res.json(headers)
        } catch (err){
            next(err)
        }
    }
    async getAllByUser(req,res,next){
        try{
            const user = req.user.id
            if (user!=null){
                const headers = await headerService.getAllByUser(user)
                res.json(headers)
            }
        } catch (err){
            next(err)
        }
    }
    async update(req,res,next){
        try{
            const { id }=req.params
            const { title }=req.body
            const { desc }=req.body
            const { category }=req.body
            const { author }=req.body
            const image = req.file!=undefined ? `/uploads/headers/${req.file.filename}` : null
            const find = await headerService.findById(id)
            const oldImage = find.image
            const header = await headerService.update({ id,title,desc,category,image,author })
            const newPath = header.image
            //console.log(newPath,image,oldImage)
            if (newPath==image&&existsSync(`src${oldImage}`))
                unlink(`src${oldImage}`,(err) => {  
                    if (err) throw err;  
                    console.log('Файл удалён');  
                })
            res.json(header)
        } catch (err){
            next(err)
        }
    }
    async delete(req,res){
        try{
            const { id }=req.params
            const header = await headerService.delete(id)
            const image = header.image
            if (existsSync(`src${image}`))
                unlink(`src${image}`,(err) => {  
                    if (err) throw err;  
                    console.log('Файл удалён');  
                })
            res.json(header)
        } catch (err){
            next(err)
        }
    }
}

export default new HeaderController()