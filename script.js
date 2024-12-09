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
});
