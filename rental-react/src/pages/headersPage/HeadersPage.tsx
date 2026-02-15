// Импорт хуков React для работы с состоянием и жизненным циклом компонента
import { useEffect, useState } from 'react';
// Импорт функций для получения и создания заголовков через API
import { fetchHeaders, createHeader, updateHeader, deleteHeader, getUsers } from '../../api/headers';
import type { Header, UpdateHeader, DeleteHeader, Authors } from '../../types/Header';
import { Link } from 'react-router-dom';
import { useAuth } from '../authPage/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './HeadersPage.css'

const UpdateHeader: React.FC<UpdateHeader> = ({ header, authors, onSave, onClose }) => {
  const [title,setTitle] = useState(header.title)
  const [desc,setDesc] = useState(header.desc)
  const [category,setCategory] = useState(header.category)
  const [author,setAuthor] = useState(header.author)
  const [image,setImage] = useState<File|null>(null)
  const handleSubmitUpdate = async (e:React.FormEvent)=>{
    e.preventDefault()// Отмена стандартного поведения формы, перезагрузки страницы
    const formData=new FormData()
    formData.append('title',title)
    if (image){
      formData.append('image',image)
    }
    formData.append('desc',desc)
    formData.append('category',category)
    formData.append('author',author)
    await updateHeader(header.id,formData)// Отправка данных на сервер и получение созданного объекта
    //setHeaders([newHeader, ...headers]) Обновление списка заголовков (новый элемент добавляется в начало)
    setTitle('')
    setImage(null)
    setDesc('')
    setCategory('')
    setAuthor('')
    onSave()
    onClose()
  }
  const handle = async (e:React.FormEvent)=>{
    e.preventDefault()
    console.log("Форма работает")
  }
  return (
    <div className='header-update-bg'>
      <div className='header-update-con'>
        <h2 className='header-update-title'>Изменение заголовка `{header.title}`</h2>
        <form className="header-update-form" onSubmit={handleSubmitUpdate}>
          <input className="form-input-title" type="text" placeholder="Заголовок" value={title}
          onChange={(e) => setTitle(e.target.value)}
          required/><p/>
          <input className='form-input-desc' type='text' placeholder='Описание' value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required/><p/>
          <input className='form-input-category' type='text' placeholder='Категория' value={category}
          onChange={(e) => setCategory(e.target.value)}
          required/><p/>
          {/* Поле выбора изображения */}
          <label htmlFor="image_uploads" className='form-input'>Выбрать фото {image!=null ? image?.name : header.image.slice(17)}</label>
          <input
          className="form-input-d" type="file" accept="image/*" id='image_uploads'
          onChange={(e) => setImage(e.target.files?.[0] || null)}/><p/>
          <select value={author} className='form-select' onChange={(e) => setAuthor(e.target.value)}>
            <option id='-'></option>
            {authors.map((author) => (
              <option key={author.id} id={`${author.id}`}>{author.name}</option>
            ))
            }
          </select><p/>
          <div className="header-update-buttons">
            <button className="header-update-submit" type="submit">Добавить</button>
            <button onClick={onClose} className='header-update-close'>Закрыть</button>
          </div>
        </form>
      </div>
    </div>
  )
}

const DeleteHeader: React.FC<DeleteHeader> = ({ id, onSave, onClose }) => {
  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()// Отмена стандартного поведения формы, перезагрузки страницы
    await deleteHeader(id)// Отправка данных на сервер и получение созданного объекта
    //setHeaders([newHeader, ...headers]) Обновление списка заголовков (новый элемент добавляется в начало)
    onSave()
    onClose()
  }
  return (
    <div className='header-delete-bg'>
      <div className='header-delete-con'>
        <h2 className='header-delete-title'>Вы точно хотите удалить заголовок?</h2>
        <form className="header-delete-form" onSubmit={handleSubmit}>
          <button className="header-button-red" type="submit">Удалить</button>
          <button onClick={onClose} className='header-button-green'>Нет</button>
        </form><p/>
      </div>
    </div>
  )
}

const HeadersPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  useEffect(() => {
    if (user==null)
      navigate('/')
    console.log('User updated in Header:', user); // Логируем user, чтобы проверить его обновление
  }, [user])
  // Состояние для хранения списка заголовков, полученных с сервера
  const [headers,setHeaders] = useState<Header[]>([])
  // Состояние для хранения текста заголовка, вводимого пользователем
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')
  const [category,setCategory] = useState('')
  const [author,setAuthor] = useState('')
  const [authors,setAuthors] = useState<Authors[]>([])
  // Состояние для хранения выбранного файла изображения
  // Тип File используется для работы с загружаемыми файлами
  const [image,setImage] = useState<File|null>(null)
  // Хук useEffect выполняется один раз при монтировании компонента
  // Используется для загрузки данных с сервера
  useEffect(()=>{
    // Тут получение списка заголовков и сохранение их в состояние
    fetchHeaders().then(setHeaders)
    getUsers().then(setAuthors)
    console.log(headers)
  },[])
  // Обработчик отправки формы
  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault()// Отмена стандартного поведения формы, перезагрузки страницы
    if (!image) return
    const formData=new FormData()
    formData.append('title',title)
    formData.append('image',image)
    formData.append('desc',desc)
    formData.append('category',category)
    formData.append('author',author)
    const newHeader=await createHeader(formData)// Отправка данных на сервер и получение созданного объекта
    setHeaders([newHeader, ...headers])// Обновление списка заголовков (новый элемент добавляется в начало)
    setTitle('')
    setImage(null)
    setDesc('')
    setCategory('')
    setAuthor('')
  }
  const [isUpdateOpen, setIsUpdateOpen] = useState<boolean>(false)
  const [updateData, setUpdateData] = useState<Header>({
    id: 0,
    title: '',
    desc: '',
    category: '',
    image: '',
    author: '',
    createdAt: ''
  })
  const openUpdate = (header:Header) => {
    setUpdateData(header)
    setIsUpdateOpen(true)
  }
  const handleSave = () => {
    fetchHeaders().then(setHeaders)
  }
  const closeUpdate = () => {
    setIsUpdateOpen(false)
  }

  const [deleteData, setDeleteData] = useState<Number>(0)
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const openDelete = (id:Number) => {
    setDeleteData(id)
    setIsDeleteOpen(true)
  }
  const closeDelete = () => {
    setIsDeleteOpen(false)
  }
  return (
    <div className="headers-page">
      <div className='headers-title'>
        <h1 className="page-title">Заголовки</h1>
        <div className='auth'>
          {user && <span className='user-name'>{user.name}</span>}
          <div className='header-action'>
          {/* Если пользователь не авторизован, показываем кнопки "Войти" и "Регистрация" */}
          {!user ? (
            <>
              <Link to='/login'>
                <button className='button-login'>Войти</button>
              </Link>
            </>
          ) : (
            // Если пользователь авторизован, показываем кнопку "Выйти"
            <button onClick={logout} className='button-logout'>
              Выйти
            </button>
          )}
        </div>
        </div>
      </div>
      <form className="header-form" onSubmit={handleSubmit}>
      <div className='form-title'>Добавление нового заголовка</div>
      <input className="form-input-title" type="text" placeholder="Заголовок" value={title}
      onChange={(e) => setTitle(e.target.value)}
      required/><p/>
      <input className='form-input-desc' type='text' placeholder='Описание' value={desc}
      onChange={(e) => setDesc(e.target.value)}
      required/><p/>
      <input className='form-input-category' type='text' placeholder='Категория' value={category}
      onChange={(e) => setCategory(e.target.value)}
      required/><p/>
      {/* Поле выбора изображения */}
      <input
      className="form-input" type="file" accept="image/*"
      onChange={(e) => setImage(e.target.files?.[0] || null)}
      required/><p/>
      <select className='form-select' onChange={(e) => setAuthor(e.target.value)}>
        <option id='-'></option>
        {authors.map((author) => (
          <option key={author.id} id={`${author.id}`}>{author.name}</option>
        ))
        }
      </select><p/>
      <button className="form-button" type="submit">
      Добавить
      </button>
      </form><p/>
      {/* Заголовок секции списка */}
      <h2 className="section-title">Список заголовков</h2>
      <div className="headers-list">
        {headers.map((header) => (
          // Карточка одного заголовка
          <div key={header.id} className="header-card">
            <h3 className="header-title">{header.title}</h3>
            <h4 className='header-category'>{header.category}</h4>
            <h4 className='header-author'>{header.author}</h4>
            {/* Изображение заголовка, получаемое с сервера */}
            <img className="header-image"
            src={`http://localhost:4200${header.image}`}
            alt={header.title}
            />
            <h4 className='header-desc'>{header.desc}</h4>
            <div className="header-buttons">
              <button className="header-button-green" onClick={()=>{openUpdate(header)}}>Изменить</button>
              <button className="header-button-red" onClick={()=>{openDelete(header.id)}}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
      {isUpdateOpen && (
        <UpdateHeader
          header={updateData}
          authors={authors}
          onSave={handleSave}
          onClose={closeUpdate}
        />
      )}
      {isDeleteOpen && (
        <DeleteHeader
          id={deleteData}
          onSave={handleSave}
          onClose={closeDelete}
        />
      )}
    </div>
  );
}
export default HeadersPage