import multer from 'multer'//Для обработки загрузки файлов (multipart/form-data)
import path from 'path'//Для работы с путями и расширениями файлов
// Настройка хранилища файлов для Multer
const storage = multer.diskStorage({
    // Функция определяет директорию, в которую будут сохраняться загружаемые файлы
    destination:(_,__,cb) =>{ 
        cb(null,'src/uploads/headers')//cb(null, путь) — указывает Multer папку для сохранения файлов
    },
    // Функция формирует имя сохраняемого файла
    filename: (_,file,cb)=>{
        const ext = path.extname(file.originalname)//Получение расширения исходного файла
        cb(null,`${Date.now()}${ext}`)//Формирование уникального имени файла на основе текущего времени
    }
});

// Используется в маршрутах Express, например uploadHeader.single('image')
export const uploadHeader = multer({ storage });