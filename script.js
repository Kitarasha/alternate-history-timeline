document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");

    const startYear = 1; // Начало шкалы времени
    const endYear = 2050; // Конец шкалы времени
    const totalYears = endYear - startYear; // Всего лет на таймлайне

    // Логируем диапазон
    console.log(`Общий диапазон лет: ${totalYears} (от ${startYear} до ${endYear})`);

    // Удаляем старые деления (если они есть) и создаём новые
    const existingMarks = document.getElementById("timeline-marks");
    if (existingMarks) {
        existingMarks.remove();
    }

    // Добавляем деления на таймлайн
    const timelineMarks = document.createElement("div");
    timelineMarks.id = "timeline-marks";
    timeline.appendChild(timelineMarks);

    const totalMarks = 20; // Количество делений
    const step = Math.floor(totalYears / totalMarks); // Шаг между числами

    for (let i = 0; i <= totalMarks; i++) {
        const year = startYear + step * i;

        // Создаём деление
        const mark = document.createElement("div");
        mark.className = "mark";

        // Добавляем подпись к делению каждые 5 шагов или в конце
        if (i % 5 === 0 || i === totalMarks) {
            const label = document.createElement("span");
            label.textContent = year; // Устанавливаем текст года
            mark.appendChild(label);
        }

        timelineMarks.appendChild(mark);
    }

    // Звёздный фон
    const canvas = document.getElementById("stars-canvas");
    const ctx = canvas.getContext("2d");

    let stars = [];
    const numStars = 200; // Количество звёзд
    const maxLineDistance = 100; // Максимальное расстояние для соединения звёзд
    const mouseRadius = 150; // Радиус взаимодействия мышки со звёздами

    const mouse = { x: null, y: null };

    window.addEventListener("mousemove", (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    window.addEventListener("mouseout", () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Star {
        constructor(x, y, dx, dy, size) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = "white";
            ctx.fill();
        }

        update() {
            if (this.x + this.size > canvas.width || this.x - this.size < 0) this.dx = -this.dx;
            if (this.y + this.size > canvas.height || this.y - this.size < 0) this.dy = -this.dy;
            this.x += this.dx;
            this.y += this.dy;

            this.draw();
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const dx = (Math.random() - 0.5) * 1;
            const dy = (Math.random() - 0.5) * 1;
            stars.push(new Star(x, y, dx, dy, size));
        }
    }

    function connectStars() {
        for (let i = 0; i < stars.length; i++) {
            for (let j = i + 1; j < stars.length; j++) {
                const distance = Math.sqrt(
                    (stars[i].x - stars[j].x) ** 2 +
                    (stars[i].y - stars[j].y) ** 2
                );
                if (distance < maxLineDistance) {
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / maxLineDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function connectToMouse() {
        for (let i = 0; i < stars.length; i++) {
            const distance = Math.sqrt(
                (stars[i].x - mouse.x) ** 2 + (stars[i].y - mouse.y) ** 2
            );
            if (distance < mouseRadius) {
                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / mouseRadius})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars(); // Пересоздаём звёзды при изменении размера окна
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => star.update());
        connectStars();
        if (mouse.x !== null && mouse.y !== null) connectToMouse();
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas); // Пересоздание фона при изменении размера окна
    resizeCanvas(); // Установка начальных размеров
    animate();
});
