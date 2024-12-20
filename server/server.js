const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Подключаем dotenv для работы с .env

const app = express();
const port = 3000;

// Подключение базы данных
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к SQLite!');
    }
});

// Создаём таблицу пользователей, если её нет
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Middleware для обработки JSON
app.use(bodyParser.json());

// Настройки SMTP для отправки email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Берётся из .env
        pass: process.env.EMAIL_PASS, // Берётся из .env
    },
});

// Маршрут для отправки отзыва
app.post('/send-feedback', (req, res) => {
    const { scenario, event, feedback } = req.body;

    // Проверяем, что все поля заполнены
    if (!scenario || typeof scenario !== 'string' || scenario.trim() === '') {
        return res.status(400).json({ error: 'Некорректный сценарий.' });
    }
    if (!event || typeof event !== 'string' || event.trim() === '') {
        return res.status(400).json({ error: 'Некорректное событие.' });
    }
    if (!feedback || typeof feedback !== 'string' || feedback.trim() === '') {
        return res.status(400).json({ error: 'Отзыв не может быть пустым.' });
    }

    // Формируем письмо
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `Отзыв по сценарию "${scenario}"`,
        text: `Сценарий: ${scenario}\nСобытие: ${event}\nОтзыв:\n${feedback}`,
    };

    // Отправляем письмо
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Ошибка отправки email:', err);
            return res.status(500).json({ error: 'Ошибка при отправке письма.' });
        }
        console.log(`Email отправлен: ${info.response}`);
        res.status(200).json({ message: 'Отзыв успешно отправлен.' });
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});

