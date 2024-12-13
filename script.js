document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("event-title");
    const modalDescription = document.getElementById("event-description");
    const closeModal = document.getElementById("close-modal");

    const alternativeContainer = document.getElementById("alternative-timelines-container"); // === Новое ===

    const startYear = 0; // Начало шкалы времени (0 н.э.)
    const endYear = 2100; // Конец шкалы времени
    const totalYears = endYear - startYear; // Всего лет на таймлайне

    console.log(`Общий диапазон лет: ${totalYears} (от ${startYear} до ${endYear})`);

    // Генерация меток на таймлайне
    const createTimelineMarks = (start, end, step, container, markClass = "timeline-mark", lineStart = startYear, lineTotal = totalYears) => {
        for (let year = start; year <= end; year += step) {
            const positionPercent = ((year - lineStart) / lineTotal) * 100;
            const mark = document.createElement("div");
            mark.className = markClass;
            mark.style.left = `${positionPercent}%`;
            mark.textContent = year;
            container.appendChild(mark);
        }
    };

    // Создание меток каждые 100 лет
    createTimelineMarks(startYear, endYear, 100, timeline);

    // === Новое/Изменено ===
    // Пример альтернативных сценариев.
    // В будущем можно вынести в отдельный файл или дополнять при загрузке данных.
    const alternativesData = {
        "476-Падение Римской Империи": [
            {
                title: "Римская империя не распалась",
                color: "#aabbcc",
                scenario: [
                    { year: 500, text: "К 500 году империя процветала... Технологии, искусство, культура..." },
                    { year: 600, text: "К 600 году Рим освоил новые территории и технологии..." }
                ]
            },
            {
                title: "Империя распалась, но позже",
                color: "#ffcc00",
                scenario: [
                    { year: 500, text: "Империя держалась, но трещины были очевидны..." },
                    { year: 550, text: "К 550 году империя всё же пала, но последствия были иными..." }
                ]
            },
            {
                title: "Открытие электричества в Риме",
                color: "#66ff66",
                scenario: [
                    { year: 480, text: "В 480 году римляне случайно открыли электричество, шокируя современников..." },
                    { year: 550, text: "К 550 году электричество изменило всё: началась досрочная индустриализация..." }
                ]
            }
        ]
    };

    // Функция для создания альтернативных таймлайнов
    function createAlternativeTimelines(alternatives, eventYear, eventTitle) {
        // Очистим контейнер от предыдущих веток, если были
        alternativeContainer.innerHTML = "";

        const key = `${eventYear}-${eventTitle}`;
        const eventAlternatives = alternativesData[key];

        if (!eventAlternatives) return;

        eventAlternatives.forEach((alt) => {
            const altTimelineWrapper = document.createElement("div");
            altTimelineWrapper.style.position = "relative";
            altTimelineWrapper.style.width = "100%";

            // Создаем альтернативный таймлайн
            const altLine = document.createElement("div");
            altLine.className = "alternative-timeline";
            altLine.style.backgroundColor = alt.color || "#ff5555";

            altTimelineWrapper.appendChild(altLine);

            // Создадим метки для альтернативного таймлайна
            // Предположим, что альтернативный сценарий развивается в том же диапазоне лет, что и основной
            createTimelineMarks(startYear, endYear, 200, altTimelineWrapper, "alternative-timeline-mark");

            // Создаем события альтернативного сценария
            alt.scenario.forEach((scEvent) => {
                const positionPercent = ((scEvent.year - startYear) / totalYears) * 100;
                const altEventDiv = document.createElement("div");
                altEventDiv.className = "alternative-event";
                altEventDiv.style.left = `${positionPercent}%`;
                altEventDiv.setAttribute("data-title", `${scEvent.year} — Альтернатива`);

                const circle = document.createElement("div");
                circle.className = "circle";
                circle.style.backgroundColor = alt.color || "#ff5555";
                altEventDiv.appendChild(circle);

                // При клике на альтернативное событие показываем сценарий (текст)
                altEventDiv.addEventListener("click", () => {
                    showAlternativeScenario(alt, scEvent, altTimelineWrapper);
                });

                altTimelineWrapper.appendChild(altEventDiv);
            });

            // Добавляем в контейнер
            alternativeContainer.appendChild(altTimelineWrapper);

            // Небольшая задержка, чтобы CSS-анимация сработала
            requestAnimationFrame(() => {
                altLine.classList.add("show");
            });
        });
    }

    // Функция отображения сценария (графической новеллы) прямо под альтернативной веткой
    function showAlternativeScenario(alt, clickedEvent, parentWrapper) {
        // Очистим предыдущий сценарий
        let scenarioBlock = parentWrapper.querySelector(".alt-scenario-block");
        if (scenarioBlock) {
            scenarioBlock.remove();
        }

        scenarioBlock = document.createElement("div");
        scenarioBlock.className = "alt-scenario-block";
        scenarioBlock.style.backgroundColor = "#333";
        scenarioBlock.style.padding = "20px";
        scenarioBlock.style.borderRadius = "10px";
        scenarioBlock.style.marginTop = "20px";
        scenarioBlock.style.boxShadow = "0 0 15px rgba(0,0,0,0.7)";
        scenarioBlock.style.color = "#fff";

        const scenarioTitle = document.createElement("h3");
        scenarioTitle.textContent = `${clickedEvent.year} год — Альтернативный сценарий: ${alt.title}`;
        scenarioTitle.style.marginBottom = "10px";

        const scenarioText = document.createElement("div");
        scenarioText.style.whiteSpace = "pre-wrap";
        scenarioText.textContent = clickedEvent.text;

        scenarioBlock.appendChild(scenarioTitle);
        scenarioBlock.appendChild(scenarioText);
        parentWrapper.appendChild(scenarioBlock);
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
                            modal.classList.remove("show");
                            createAlternativeTimelines(eventAlternatives, eventYear, event.title);
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
