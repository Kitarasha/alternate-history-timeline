document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("event-title");
    const modalDescription = document.getElementById("event-description");
    const closeModal = document.getElementById("close-modal");

    const startYear = 0; // Начало шкалы времени (0 н.э.)
    const endYear = 2100; // Конец шкалы времени
    const totalYears = endYear - startYear; // Всего лет на таймлайне

    console.log(`Общий диапазон лет: ${totalYears} (от ${startYear} до ${endYear})`);

    // Генерация меток на таймлайне
    const createTimelineMarks = (start, end, step) => {
        for (let year = start; year <= end; year += step) {
            const positionPercent = ((year - start) / totalYears) * 100;
            const mark = document.createElement("div");
            mark.className = "timeline-mark";
            mark.style.left = `${positionPercent}%`;
            mark.textContent = year;
            timeline.appendChild(mark);
        }
    };

    // Создание меток каждые 100 лет
    createTimelineMarks(startYear, endYear, 100);

    // === Новое ===
    // Пример альтернативных сценариев. В будущем можно вынести в отдельный файл или дополнять при загрузке данных.
    // Ключ формата: "год - название события"


    const alternativesData = {
        "300-Великое переселение народов": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
        ],
        "476-Падение Римской Империи": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
           ],
           "1096-Первый крестовый поход": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
          ],
          "1440-Изобретение печатного станкa": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
          ],
          "1492-Открытие Америки Колумбом": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
          ],
            "1760-Промышленная революция в Англии": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
           ],
            "1914-Первая мировая война": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
          ],
            "1969-Высадка человека на Луну": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
          ],
          "1991-Создание World Wide Web": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            }
          ],
          "2002-Основание компании SpaceX": [
            {
                title: "Римская империя не распалась",
                color: "#80cbc4",
                scenario: [
                    { year: 500, text: "Рим успешно реорганизовал свои провинции..." },
                    { year: 600, text: "Благодаря стабильности и развитию инфраструктуры..." },
                    { year: 800, text: "Изобретение первых прототипов часов..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#4db6ac",
                scenario: [
                    { year: 476, text: "Германские племена всё же нанесли серьёзный урон..." },
                    { year: 700, text: "Период Второго Возрождения..." },
                    { year: 1200, text: "Вместо феодальной раздробленности Европа под управлением..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#009688",
                scenario: [
                    { year: 480, text: "Римские инженеры делают открытия в области магнетизма..." },
                    { year: 550, text: "Рим выходит на новый уровень социального развития..." },
                    { year: 600, text: "Константинополь становится Электрической столицей мира..." }
                ]
            },
        ]
    };

    // === Новое ===
    // Получаем элементы новых модалок
    const alternativesModal = document.getElementById("alternatives-modal");
    const closeAlternatives = document.getElementById("close-alternatives");
    const alternativesList = document.getElementById("alternatives-list");

    const scenarioModal = document.getElementById("scenario-modal");
    const closeScenario = document.getElementById("close-scenario");
    const scenarioTitle = document.getElementById("scenario-title");
    const scenarioText = document.getElementById("scenario-text");
    const scenarioNext = document.getElementById("scenario-next");

    let currentScenario = [];
    let currentScenarioIndex = 0;

    closeAlternatives.addEventListener("click", () => {
        alternativesModal.classList.remove("show");
    });

    closeScenario.addEventListener("click", () => {
        scenarioModal.classList.remove("show");
        currentScenario = [];
        currentScenarioIndex = 0;
        scenarioText.textContent = "";
    });

    alternativesModal.addEventListener("click", (event) => {
        if (event.target === alternativesModal) {
            alternativesModal.classList.remove("show");
        }
    });

    scenarioModal.addEventListener("click", (event) => {
        if (event.target === scenarioModal) {
            scenarioModal.classList.remove("show");
        }
    });

    scenarioNext.addEventListener("click", () => {
        currentScenarioIndex++;
        if (currentScenarioIndex < currentScenario.length) {
            showScenarioStep(currentScenarioIndex);
        } else {
            scenarioText.textContent += "\n\nКонец альтернативного сценария.";
            scenarioNext.disabled = true;
        }
    });

    // Глобальная переменная для хранения текущего интервала
let currentInterval;

function showScenarioStep(index) {
    scenarioNext.disabled = false;
    scenarioText.textContent = ""; // Очищаем текстовый контейнер
    const fullText = `${currentScenario[index].year} год:\n${currentScenario[index].text}`;
    let charIndex = 0;

    // Путь к изображению для текущего сценария
    const imagePath = currentScenario[index].image || ""; // Убедитесь, что в данных сценария есть поле image

    // Настройка изображения
    if (imagePath) {
        scenarioImage.src = imagePath; // Устанавливаем путь к изображению
        scenarioImage.style.display = "block"; // Показываем картинку
    } else {
        scenarioImage.style.display = "none"; // Скрываем картинку, если её нет
    }

    // Печатаем текст
    if (currentInterval) {
        clearInterval(currentInterval); // Очищаем предыдущий интервал
    }

    currentInterval = setInterval(() => {
        scenarioText.textContent += fullText.charAt(charIndex);
        charIndex++;
        if (charIndex >= fullText.length) {
            clearInterval(currentInterval); // Останавливаем интервал, когда текст завершён
        }
    }, 25); // Настройте скорость печати
}



    function showAlternatives(year, title) {
        const key = `${year}-${title}`;
        const eventAlternatives = alternativesData[key];
        if (!eventAlternatives) return;

        alternativesList.innerHTML = "";
        eventAlternatives.forEach((alt) => {
            const altDiv = document.createElement("div");
            altDiv.className = "alternative-option";
            altDiv.textContent = alt.title;
            altDiv.style.backgroundColor = alt.color || "#444";
            altDiv.addEventListener("click", () => {
                showScenario(alt.scenario);
            });
            alternativesList.appendChild(altDiv);
        });

        alternativesModal.classList.add("show");
    }

    function showScenario(scenario) {
        alternativesModal.classList.remove("show");
        scenarioModal.classList.add("show");
        currentScenario = scenario;
        currentScenarioIndex = 0;
        scenarioNext.disabled = false;
        showScenarioStep(currentScenarioIndex);
    }

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
                console.log(`Обработка события: ${JSON.stringify(event)}`);

                if (!eventYear || isNaN(eventYear)) {
                    console.error(`Некорректный год у события: ${JSON.stringify(event)}`);
                    return;
                }

                const positionPercent = ((eventYear - startYear) / totalYears) * 100;
                console.log(`Событие "${event.title}": Год = ${eventYear}, Позиция = ${positionPercent.toFixed(2)}%`);

                const eventDiv = document.createElement("div");
                eventDiv.className = "event";
                eventDiv.style.left = `${positionPercent}%`;

                eventDiv.setAttribute("data-title", `${eventYear} — ${event.title}`);
                eventDiv.setAttribute("data-description", event.description);

                const circle = document.createElement("div");
                circle.className = "circle";
                eventDiv.appendChild(circle);

                timeline.appendChild(eventDiv);

                eventDiv.addEventListener("click", () => {
                    modalTitle.textContent = `${eventYear} — ${event.title}`;
                    modalDescription.textContent = event.description || "Нет описания для этого события.";
                    modal.classList.add("show");

                    // === Новое ===
                    // Проверяем, есть ли альтернативы
                    const key = `${eventYear}-${event.title}`;
                    let altButton = document.getElementById("view-alternatives-btn");
                    if (!altButton) {
                        altButton = document.createElement("button");
                        altButton.id = "view-alternatives-btn";
                        altButton.textContent = "Альтернативные сценарии";
                        modal.querySelector(".modal-content").appendChild(altButton);
                    }
                    const eventAlternatives = alternativesData[key];
                    if (eventAlternatives && eventAlternatives.length > 0) {
                        altButton.style.display = "inline-block";
                        altButton.onclick = () => {
                            showAlternatives(eventYear, event.title);
                        };
                    } else {
                        altButton.style.display = "none";
                    }
                });
            });
        })
        .catch(error => console.error(`Ошибка обработки данных: ${error.message}`));

    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

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
        if (mouse.x !== null && mouse.y !== null) {
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
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initStars();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach((star) => star.update());
        connectStars();
        connectToMouse();
        requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    animate();
});
