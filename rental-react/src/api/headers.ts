import type { Header,Authors } from "../types/Header";

const API_URL='http://localhost:4200/api/headers/'
const API_Auth_URL='http://localhost:4200/api/auth/'

// Функция для получения списка заголовков с сервера
export async function fetchHeaders(): Promise<Header[]> {
    const res = await fetch(API_URL,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })//запрос GET
    return res.json()  
}

// Функция для создания нового заголовка с изображением
export async function createHeader(formData:FormData): Promise<Header> {
    // FormData используется для передачи текста и файла изображения
    const res = await fetch(API_URL,{
        method:'POST',
        body:formData,
        credentials: 'include',
    })//запрос POST
    return res.json()
}

export async function updateHeader(id:Number,formData:FormData): Promise<Header> {
    // FormData используется для передачи текста и файла изображения
    const res = await fetch(`${API_URL}${id}`,{
        method:'PUT',
        body:formData,
        credentials: 'include',
    })//запрос PUT
    return res.json()
}

export async function deleteHeader(id:Number): Promise<Header> {
    // FormData используется для передачи текста и файла изображения
    const res = await fetch(`${API_URL}${id}`,{
        method:'DELETE',
        credentials: 'include',
    })//запрос DELETE
    return res.json()
}

export async function getUsers(): Promise<Authors[]> {
    const res = await fetch(`${API_Auth_URL}profiles`,{
        method:'GET'
    })
    return res.json()
}