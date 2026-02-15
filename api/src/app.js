import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'
import headersRoutes from './routes/headerRoutes.js'
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express()
export const prisma = new PrismaClient()


app.use(
  cors({
    origin: 'http://localhost:5173', // фронт, который будет обращаться к API
    credentials: true, // разрешаем отправку кук
  })
);

app.use(cookieParser())
app.use(express.json())

app.use('/api/headers',headersRoutes)
app.use('/api/auth',authRoutes)
app.use('/uploads', express.static('src/uploads'));//Данная строка используется для раздачи статических файлов (изображений)
//с сервера клиентскому приложению. Без нее изображения физически есть на сервере, но браузер не может их получить.

export default app