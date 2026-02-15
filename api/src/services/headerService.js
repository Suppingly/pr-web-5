import { prisma } from '../app.js'

class HeaderService {
    async create({title,desc,category,image,user,author}){
        return prisma.header.create({
            data: { title,desc,category,image,user,author }
        })
    }
    async getAll() {
        return prisma.header.findMany({
        orderBy: { createdAt: 'desc' },
        })
    }
    async getAllByUser(userId) {
        return prisma.header.findMany({
            where: { user:userId },
            orderBy: { createdAt: 'desc' },
        })
    }
    async update({id,title,desc,category,image,author}){
        if (image==null){
            return prisma.header.update({
                where:{ id: Number(id) },
                data: { title,desc,category,author },
                select: { id:true,title:true,desc:true,category:true,image:true,author:true }
            })
        }
        return prisma.header.update({
            where:{ id: Number(id) },
            data: { title,desc,category,image,author },
            select: { id:true,title:true,desc:true,category:true,image:true,author:true }
        })
    }
    async delete(id){
        return prisma.header.delete({
            where:{ id:Number(id) }
        })
    }
    async findById(id){
        return prisma.header.findUnique({
            where:{ id:Number(id) },
            select:{ title:true,desc:true,category:true,image:true,author:true }
        })
    }
}

export default new HeaderService()