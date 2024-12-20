document.getElementById('registration-form').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Получаем значения логина и пароля
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');

    // Проверяем длину пароля
    if (password.length < 6) {
        message.textContent = 'Пароль должен быть не менее 6 символов!';
        message.style.color = 'red';
        return;
    }

    try {
        // Отправляем данные на сервер для регистрации
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password }),
        });

        if (response.ok) {
            // Успешная регистрация
            message.textContent = 'Регистрация успешна! Перенаправляем...';
            message.style.color = 'green';

            // Сохраняем информацию о входе (например, в localStorage)
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('login', login);

            // Перенаправляем на главную страницу
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        } else {
            // Если сервер вернул ошибку
            const error = await response.json();
            message.textContent = `Ошибка: ${error.error}`;
            message.style.color = 'red';
        }
    } catch (err) {
        // Ошибка подключения к серверу
        message.textContent = 'Ошибка соединения с сервером.';
        message.style.color = 'red';
    }
});

// Проверяем, авторизован ли пользователь
document.addEventListener('DOMContentLoaded', () => {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        window.location.href = 'register.html'; // Перенаправляем на страницу регистрации
    }
});
