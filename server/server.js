const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

// Подключаем SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к SQLite!');
    }
});

// Создаём таблицу, если её нет
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
)`);
// Маршрут для регистрации
app.post('/register', (req, res) => {
  const { login, password } = req.body;

  // Проверяем входные данные
  if (!login || !password) {
    return res.status(400).json({ error: 'Логин и пароль обязательны' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Пароль должен быть не менее 6 символов' });
  }

  // Сохраняем пользователя в базу данных
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

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
    res.send('Сервер работает с SQLite!');
});

// Добавление пользователя
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    db.run(
        `INSERT INTO users (name, email) VALUES (?, ?)`,
        [name, email],
        function (err) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json({ id: this.lastID });
            }
        }
    );
});

// Получение списка пользователей
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
