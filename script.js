document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("event-title");
    const modalDescription = document.getElementById("event-description");
    const closeModal = document.getElementById("close-modal");

    const startYear = -4000; // Начало шкалы времени (4000 до н.э.)
    const endYear = 2050;   // Конец шкалы времени
    const totalYears = endYear - startYear; // Всего лет на таймлайне

    fetch('timeline_data.json')
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                console.error("Данные пусты!");
                return;
            }

            data.forEach(event => {
                const eventYear = event.year;
                if (!eventYear || isNaN(eventYear)) {
                    console.error(`Некорректный год у события: ${JSON.stringify(event)}`);
                    return;
                }

                // Создание события
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";

                // Расчёт позиции события
                const positionPercent = ((eventYear - startYear) / totalYears) * 100;
                eventDiv.style.left = `${positionPercent}%`;

                console.log(`Событие "${event.title}" расположено на ${positionPercent}% от начала`);

                // Добавление атрибутов
                eventDiv.setAttribute("data-title", `${eventYear} — ${event.title}`);
                eventDiv.setAttribute("data-description", event.description);

                // Создание кружка
                const circle = document.createElement("div");
                circle.className = "circle";
                eventDiv.appendChild(circle);

                timeline.appendChild(eventDiv);

                // Добавляем интерактивность
                eventDiv.addEventListener("click", () => {
                    modalTitle.textContent = `${eventYear} — ${event.title}`;
                    modalDescription.textContent = event.description;
                    modal.classList.add("show");
                });
            });
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));

    // Закрытие модального окна
    closeModal.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    });
});

