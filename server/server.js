// Загружаем зависимости
require('dotenv').config(); // Подключаем файл с переменными окружения
const express = require('express');
const { Pool } = require('pg'); // Подключение к PostgreSQL

// Создаём сервер
const app = express();
const port = 3000;

// Указываем, что сервер может обрабатывать JSON
app.use(express.json());

// Подключение к базе данных PostgreSQL
const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Берём строку подключения из переменной окружения
    ssl: {
        rejectUnauthorized: false, // Для работы с Railway
    },
});

// Проверка подключения к базе данных
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
    } else {
        console.log('Успешное подключение к базе данных:', res.rows);
    }
});

// Простой маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Сервер работает!');
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

