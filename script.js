document.addEventListener("DOMContentLoaded", () => {
    const timeline = document.getElementById("timeline");

    fetch('timeline_data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                const eventDiv = document.createElement("div");
                eventDiv.className = "event";

                const title = document.createElement("h2");
                title.textContent = event.title;

                const description = document.createElement("p");
                description.textContent = event.description;

                eventDiv.appendChild(title);
                eventDiv.appendChild(description);

                timeline.appendChild(eventDiv);
            });
        })
        .catch(error => console.error("Ошибка загрузки данных:", error));
});
