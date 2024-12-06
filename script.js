document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("event-title");
    const modalDescription = document.getElementById("event-description");
    const closeModal = document.getElementById("close-modal");

    // Загрузка данных из timeline_data.json
    fetch('timeline_data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                // Создание события на таймлайне
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";
                eventDiv.setAttribute("data-title", event.title);
                eventDiv.setAttribute("data-description", event.description);

                // Создание кружка для события
                const circle = document.createElement("div");
                circle.className = "circle";

                // Добавляем кружок в событие
                eventDiv.appendChild(circle);

                // Добавляем событие на таймлайн
                timeline.appendChild(eventDiv);

                // Добавляем интерактивность при наведении
                eventDiv.addEventListener("mouseover", () => {
                    // Отображаем всплывающее описание
                    eventDiv.setAttribute("data-title", event.title);
                });

                // Открытие модального окна при клике
                eventDiv.addEventListener("click", () => {
                    modalTitle.textContent = event.title;
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
