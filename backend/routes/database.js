require('dotenv').config();

const { Pool } = require('pg');

// Создание пула подключений с использованием переменных окружения
const pool = new Pool({
  user: process.env.DB_USER,          // Имя пользователя
  host: process.env.DB_HOST,          // Адрес хоста
  database: process.env.DB_DATABASE,  // Имя базы данных
  password: process.env.DB_PASSWORD,  // Пароль
  port: process.env.DB_PORT,          // Порт
});

const fetchProductByName = async (name) => {
    try {
        const query =  'SELECT * FROM products WHERE name = $1';
        const res = await pool.query(query, [name]);
        return res.rows; 
    } 
    catch (error) {
        console.error('Ошибка при получении продукта:', error);
        throw error; 
    }
};

const fetchThemeByUID = async (uid) => {
    try {
        const query =  'SELECT theme FROM users WHERE id = $1';
        const res = await pool.query(query, [uid]);
        return res.rows; 
    } 
    catch (error) {
        console.error('Ошибка при получении продукта:', error);
        throw error; 
    }
};

const fetchUserData = async () => {
    try {
        const query =  'SELECT * FROM users';
        const res = await pool.query(query);
        return res.rows; 
    } 
    catch (error) {
        console.error('Ошибка при получении продукта:', error);
        throw error; 
    }
};

/////////////////////////////////////////////

const addUserToDB = async (uid) => {
    console.log("добавлено")
    console.log(uid)
    try {
        const query =  'INSERT INTO users (id) VALUES ($1) ON CONFLICT (id) DO NOTHING'
        const res = await pool.query(query, [uid]); // Выполнение запроса с uid
        return { message: 'Пользователь добавлен или уже существует' }; // Возвращаем сообщение об успешном добавлении
    } 
    catch (error) {
        console.error('Ошибка при получении продукта:', error);
        throw error; 
    }
};


// Экспортируйте пул и функцию для использования в других файлах
module.exports = { fetchProductByName, fetchThemeByUID, addUserToDB, fetchUserData };