const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
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

// Маршрут для регистрации
app.post('/register', (req, res) => {
    const { login, password } = req.body;

    if (!login || !password) {
        return res.status(400).json({ error: 'Логин и пароль обязательны' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Пароль должен быть не менее 6 символов' });
    }

    db.run(
        `INSERT INTO users (login, password) VALUES (?, ?)`,
        [login, password],
        function (err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    res.status(400).json({ error: 'Логин уже занят' });
                } else {
                    res.status(500).json({ error: 'Ошибка базы данных' });
                }
            } else {
                res.status(201).json({ id: this.lastID });
            }
        }
    );
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
