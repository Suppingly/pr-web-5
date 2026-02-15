import React, { useState } from 'react'; // Импортируем React и хук useState
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import './AuthForm.css'

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Стейт для переключения между формой авторизации и регистрации. Начально показываем форму авторизации

  // Функция для переключения между формами
  const toggleForm = () => setIsLogin((prev) => !prev); // Меняем состояние на противоположное (если был логин, станет регистрация и наоборот)

  return (
    <div className='auth-container'>
      <h1 className='auth-title'>{isLogin ? 'Авторизация' : 'Регистрация'}</h1>
      {isLogin ? <LoginForm /> : <RegisterForm />}
      {/* Кнопка для переключения между формами */}
      <button onClick={toggleForm} className='toggle-button'>
        {isLogin ? 'Нет аккаунта? Регистрация' : 'Есть аккаунт? Войти'}
      </button>
    </div>
  );
};

export default AuthForm;
