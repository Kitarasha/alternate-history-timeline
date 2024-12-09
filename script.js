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
            data.forEach(event => {
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";

                // Расчёт позиции события
                const positionPercent = ((event.year - startYear) / totalYears) * 100;
                eventDiv.style.left = `${positionPercent}%`;

                // Добавление атрибутов данных
                eventDiv.setAttribute("data-title", `${event.year} — ${event.title}`);
                eventDiv.setAttribute("data-description", event.description);

                const circle = document.createElement("div");
                circle.className = "circle";
                eventDiv.appendChild(circle);
                timeline.appendChild(eventDiv);

                // Наведение для отображения заголовка
                eventDiv.addEventListener("mouseover", () => {
                    eventDiv.setAttribute("data-title", `${event.year} — ${event.title}`);
                });

                // Открытие модального окна при клике
                eventDiv.addEventListener("click", () => {
                    modalTitle.textContent = `${event.year} — ${event.title}`;
                    modalDescription.textContent = event.description;
                    modal.classList.add("show"); // Показать модальное окно
                });
            });
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));

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
});

