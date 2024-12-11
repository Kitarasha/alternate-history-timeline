document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("event-title");
    const modalDescription = document.getElementById("event-description");
    const closeModal = document.getElementById("close-modal");

    const startYear = 1; // Начало шкалы времени (1 н.э.)
    const endYear = 2050;   // Конец шкалы времени
    const totalYears = endYear - startYear; // Всего лет на таймлайне

    console.log(`Общий диапазон лет: ${totalYears} (от ${startYear} до ${endYear})`);
    // Генерация меток на таймлайне
const createTimelineMarks = (start, end, step) => {
    for (let year = start; year <= end; year += step) {
        const positionPercent = ((year - start) / totalYears) * 100;

        // Создание метки
        const mark = document.createElement("div");
        mark.className = "timeline-mark";
        mark.style.left = `${positionPercent}%`;
        mark.textContent = year;

        timeline.appendChild(mark);
    }
};

// Вызов функции для создания меток каждые 100 лет
createTimelineMarks(startYear, endYear, 100);


    // Загрузка данных из файла timeline_data.json
    fetch('timeline_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки файла: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data) || data.length === 0) {
                console.error("Данные пусты или не являются массивом!");
                return;
            }

            data.forEach(event => {
                const eventYear = event.year;

                // Логируем данные о событии
                console.log(`Обработка события: ${JSON.stringify(event)}`);

                if (!eventYear || isNaN(eventYear)) {
                    console.error(`Некорректный год у события: ${JSON.stringify(event)}`);
                    return;
                }

                // Расчёт позиции события
                const positionPercent = ((eventYear - startYear) / totalYears) * 100;

                // Логируем расчёты
                console.log(`Событие "${event.title}": Год = ${eventYear}, Позиция = ${positionPercent.toFixed(2)}%`);
                

                // Создание элемента события
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";
                eventDiv.style.left = `${positionPercent}%`;

                // Добавление атрибутов
                eventDiv.setAttribute("data-title", `${eventYear} — ${event.title}`);
                eventDiv.setAttribute("data-description", event.description);

                // Создание кружка
                const circle = document.createElement("div");
                circle.className = "circle";
                eventDiv.appendChild(circle);

                timeline.appendChild(eventDiv);

                // Обработка клика на событие
                eventDiv.addEventListener("click", () => {
                    modalTitle.textContent = `${eventYear} — ${event.title}`;
                    modalDescription.textContent = event.description || "Нет описания для этого события.";
                    modal.classList.add("show");
                });
            });
        })
        .catch(error => console.error(`Ошибка обработки данных: ${error.message}`));

    // Закрытие модального окна при клике на крестик
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    // Закрытие модального окна при клике вне его
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });

    // Звёздный фон
    const canvas = document.getElementById("stars-canvas");
    const ctx = canvas.getContext("2d");

    let stars = [];
    const numStars = 200;
    const maxLineDistance = 100;
    const mouseRadius = 150;

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
        let outerRadius = this.size;
        let innerRadius = this.size / 2;
        let spikes = 5;

        let rotation = Math.PI / 2 * 3;
        let x = this.x;
        let y = this.y;
        ctx.moveTo(x, y - outerRadius);

        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(
                x + Math.cos(rotation) * outerRadius,
                y + Math.sin(rotation) * outerRadius
            );
            rotation += Math.PI / spikes;

            ctx.lineTo(
                x + Math.cos(rotation) * innerRadius,
                y + Math.sin(rotation) * innerRadius
            );
            rotation += Math.PI / spikes;
        }

        ctx.lineTo(x, y - outerRadius);
        ctx.closePath();
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
