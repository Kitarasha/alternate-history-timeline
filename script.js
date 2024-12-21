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
    "300-Great Migration of Peoples": [
        {
            title: "Integration and Federation",
            color: "#80cbc4",
            scenario: [
                { year: 345, text: "The Roman Empire makes treaties with migrants, granting them land and including them in the legions. This strengthens the borders and reduces conflicts. Tribes receive the status of federates and are obliged to defend the empire." },
                { year: 412, text: "The Vandals form an alliance with the Roman emperor, receiving lands in North Africa. This marks the beginning of Carthage's prosperity as a trade center, blending Roman and barbarian cultures." },
                { year: 590, text: "Descendants of migrants occupy key positions in the administration of the empire. The first Goth becomes a consul, officially representing the interests of federates in the Roman Senate." }
            ]
        },
        {
            title: "Complete Destruction",
            color: "#4db6ac",
            scenario: [
                { year: 376, text: "Migrants bring their traditions, crafts, and beliefs. The Goths teach the Romans new methods of forging weapons, while the Romans share architectural knowledge. Barbarian tribes begin adopting Christianity." },
                { year: 410, text: "The period of the Second Renaissance begins..." },
                { year: 512, text: "Instead of feudal fragmentation, Europe develops under unified governance..." }
            ]
        },
        {
            title: "Union of East and West",
            color: "#009688",
            scenario: [
                { year: 395, text: "The Eastern and Western Roman Empires jointly organize the resettlement of Vandals and Alans to North Africa. The barbarians gain control of the territory, promising to protect it from Berber invasions." },
                { year: 450, text: "In the East, cultural ties with the Germans strengthen. A school opens in Constantinople where both Latin and Germanic dialects are studied. This leads to the first translations of Germanic epics." },
                { year: 705, text: "The empire expands its influence to the East. Descendants of migrants establish new cities in Asia Minor, blending Roman technology with barbarian building traditions." }
            ]
        }
    ],
    "476-Fall of the Roman Empire": [
        {
            title: "Germanic Empire",
            color: "#80cbc4",
            scenario: [
                { year: 476, text: "Odoacer creates the Germanic Empire, uniting barbarian tribes under his rule. Roman administration is preserved, but Germanic traditions begin to influence governance." },
                { year: 600, text: "The Germanic Empire expands its territories to the north and east, including Scandinavia. Barbarian culture gradually assimilates with Roman culture, creating a new multicultural civilization." },
                { year: 750, text: "The empire reaches its peak, becoming a powerful center of trade and science. Latin remains the official language, but new dialects develop in regions, strengthening regional identity." }
            ]
        },
        {
            title: "Eastern Control",
            color: "#4db6ac",
            scenario: [
                { year: 476, text: "After the fall of the Western Empire, Constantinople strengthens its influence. The Eastern Empire sends troops to protect Ravenna and other strategic cities." },
                { year: 650, text: "Byzantium retains control over Italy, the Balkans, and parts of Spain. Former western provinces begin adopting eastern traditions and architecture." },
                { year: 800, text: "The Eastern Empire becomes the dominant force in the Mediterranean. A new culture blending Roman and Greek elements shapes the future development of Europe." }
            ]
        },
        {
            title: "Divided Europe",
            color: "#009688",
            scenario: [
                { year: 476, text: "After the collapse of the Western Empire, Germanic tribes establish independent kingdoms. The Franks take Gaul, the Visigoths take Spain, and the Vandals take North Africa." },
                { year: 700, text: "Europe remains fragmented. Each region develops autonomously, combining barbarian traditions with remnants of Roman culture." },
                { year: 950, text: "Christianity unites Europe spiritually, but politically it remains divided. The first universities appear in former Roman provinces, marking the beginning of cultural revival." }
            ]
        }
    ],
    "1096-First Crusade": [
        {
            title: "Success of the Crusaders",
            color: "#80cbc4",
            scenario: [
                { year: 1096, text: "The Crusaders, under unified command, achieve their goal of capturing Jerusalem. They establish the Kingdom of Jerusalem, which becomes a center of Christian presence in the East." },
                { year: 1296, text: "Crusader states strengthen their positions, acting as intermediaries between Europe and the East. Europe actively adopts Eastern technologies, medicine, and philosophy, accelerating its development and laying the groundwork for the Renaissance." },
                { year: 1496, text: "Enriched by knowledge and resources from the East, Europe becomes the economically and culturally dominant region. Crusader states still exist, leading to the formation of a unique Christian-Muslim culture." }
            ]
        },
        {
            title: "Failure of the Crusaders",
            color: "#4db6ac",
            scenario: [
                { year: 1096, text: "The Crusaders face strong resistance from the Seljuks. Most of the army perishes, and the remaining scattered groups return to Europe. Attempts to unite the forces fail." },
                { year: 1296, text: "The lack of influence from the East slows Europe's development. The Ottoman Empire grows stronger, capturing key Byzantine territories, including Constantinople. Europe remains isolated and falls into economic stagnation." },
                { year: 1596, text: "The Ottoman Empire dominates the East and the Mediterranean, even threatening Western European powers. European culture remains localized, and technological progress lags significantly." }
            ]
        },
        {
            title: "Alternative Crusade of Knowledge",
            color: "#009688",
            scenario: [
                { year: 1096, text: "Instead of a military campaign, Christian leaders organize a 'Crusade of Knowledge.' Instead of capturing Jerusalem, the Crusaders focus on establishing cultural and scientific connections with the East." },
                { year: 1296, text: "Europe becomes a center of science thanks to knowledge brought from the East. Mathematics, medicine, and astronomy flourish. The city of Toulouse becomes Europe's counterpart to Baghdad—a hub of global science." },
                { year: 1596, text: "Scientific cooperation between the East and West leads to a technological revolution. The first steam engine is developed in the 16th century, and early mechanically powered ships explore new lands." }
            ]
        }
    ],
   "1440-Invention of the Printing Press": [
    {
        title: "Rapid Spread of Knowledge",
        color: "#80cbc4",
        scenario: [
            { year: 1440, text: "Johannes Gutenberg invents the printing press, and the first books, including the Bible, begin to be mass-produced. Information becomes accessible to a wide audience, transforming society." },
            { year: 1640, text: "Thanks to printed materials, scientific discoveries spread across Europe. The Reformation accelerates, creating new social and religious movements. Education becomes available to the middle class." },
            { year: 1840, text: "The printing press stimulates the Industrial Revolution, forming the foundation for the newspaper and book industries. The spread of knowledge worldwide helps foster democracies and social reforms." }
        ]
    },
    {
        title: "Restricted Printing",
        color: "#4db6ac",
        scenario: [
            { year: 1440, text: "The printing press is invented, but its use is strictly controlled by the church and monarchy. Books can only be printed with official approval, limiting the free dissemination of knowledge." },
            { year: 1640, text: "Printing remains rare, accessible only to the elite. Society relies on oral traditions, and widespread literacy lags. The Reformation and scientific revolutions slow down." },
            { year: 1840, text: "Europe falls behind in development compared to other regions where printing spreads more freely. America and China, where printing is less controlled, become global leaders." }
        ]
    },
    {
        title: "Early Global Breakthrough",
        color: "#009688",
        scenario: [
            { year: 1440, text: "Gutenberg shares his technology with traveling merchants, and the printing press quickly spreads worldwide. Within 50 years, printing reaches the Ottoman Empire, India, and China." },
            { year: 1640, text: "The global spread of printing technology leads to a synthesis of knowledge between cultures. Chinese discoveries in medicine and agriculture become accessible in Europe, while European scientific works are read in the Middle East." },
            { year: 1840, text: "The globalization of knowledge leads to early technological development, including electricity and mechanization. A unified scientific network emerges, and steam engines begin to be used on all continents." }
        ]
    }
],
"1492-Discovery of America by Columbus": [
    {
        title: "Rapid Colonization",
        color: "#80cbc4",
        scenario: [
            { year: 1492, text: "Columbus discovers America, and Spain quickly begins expansion. The first colonies appear in the Caribbean, followed by mainland exploration." },
            { year: 1692, text: "Colonies span both Americas. Gold and silver from the New World stimulate Europe's economic development but lead to inflation. Indigenous populations suffer from diseases and exploitation." },
            { year: 1892, text: "America becomes a key global region, shaping trade and economy worldwide. Immigrants from Europe continue to populate the continents, creating a multicultural society." }
        ]
    },
    {
        title: "Limited Development",
        color: "#4db6ac",
        scenario: [
            { year: 1492, text: "Columbus discovers America, but his findings generate little interest. Other European powers are hesitant to finance further expeditions." },
            { year: 1692, text: "Europeans limit themselves to trade with local populations along the coasts. The interior of America remains undeveloped. Indigenous civilizations like the Aztecs and Incas continue to thrive." },
            { year: 1892, text: "America remains largely independent. Local states form alliances and begin industrialization, inspired by European technologies." }
        ]
    },
    {
        title: "American Empire",
        color: "#009688",
        scenario: [
            { year: 1492, text: "After discovering America, Columbus encounters powerful indigenous civilizations. Instead of conquest, he negotiates alliances with rulers like Montezuma, bringing technology and creating trade networks." },
            { year: 1692, text: "American civilizations integrate European technologies, forming a united empire spanning both Americas. Europe becomes dependent on American goods like cocoa, tobacco, and potatoes." },
            { year: 1892, text: "The American Empire becomes a superpower rivaling Europe. Its cities blend European architecture with indigenous traditions, creating a unique culture dominating the global stage." }
        ]
    }
],
"1760-Industrial Revolution in England": [
    {
        title: "Rome Never Fell",
        color: "#80cbc4",
        scenario: [
            { year: 1760, text: "The Industrial Revolution begins in England. Steam engines, textile mechanization, and metallurgy development lead to industrial growth." },
            { year: 1860, text: "England becomes the world's factory, spreading its technologies worldwide. Rapid urbanization and transport networks stimulate scientific discoveries and engineering innovations." },
            { year: 1960, text: "The Industrial Revolution leads to early development in electronics, space exploration, and biotechnology. England remains a global center of technological progress, setting the tone for global industry." }
        ]
    },
    {
        title: "Revolution Stalls",
        color: "#4db6ac",
        scenario: [
            { year: 1760, text: "The Industrial Revolution begins but quickly faces societal resistance. Workers' movements and fears of mechanization limit the adoption of new technologies." },
            { year: 1860, text: "England remains an agrarian power with minimal industrial development. The USA and Germany overtake it, becoming leaders in global industry." },
            { year: 1960, text: "England loses its influence on the global economy. Industrial progress in other countries creates powerful technological hubs, while England focuses on agriculture and trade." }
        ]
    },
    {
        title: "Early Globalization",
        color: "#009688",
        scenario: [
            { year: 1760, text: "The Industrial Revolution in England receives immediate international response. Technologies spread to Europe, India, and China through active trade and colonial investments." },
            { year: 1860, text: "Thanks to global technology exchange, the Industrial Revolution becomes a worldwide phenomenon. China and India actively develop their industries, narrowing the gap between the West and East." },
            { year: 1960, text: "Globalization, initiated in the 18th century, leads to the creation of international corporations and early forms of the digital economy. The world develops more evenly, with England retaining a key role as a trade and financial center." }
        ]
    }
],
"1914-World War I": [
    {
        title: "Short War",
        color: "#80cbc4",
        scenario: [
            { year: 1914, text: "The conflict between the powers flares up, but thanks to successful diplomatic efforts and limited military actions, the war ends by the end of 1915. Agreements are made to restore pre-war borders." },
            { year: 1940, text: "Europe experiences an economic boom, avoiding large-scale destruction. Germany and France become industrial partners, while the USA remains a neutral power." },
            { year: 1990, text: "European countries form an early union promoting economic integration. World War II does not occur, and the world enters the 21st century without major military conflicts." }
        ]
    },
    {
        title: "Long and Destructive War",
        color: "#4db6ac",
        scenario: [
            { year: 1914, text: "World War I begins with aggressive actions by Germany and Austria-Hungary. The conflict escalates into a global confrontation with active involvement from colonies." },
            { year: 1930, text: "The war lasts nearly two decades, devastating Europe. Economic and social crises engulf the world, leading to the collapse of empires and intensified local conflicts." },
            { year: 1960, text: "After the long war, the global system remains fragmented. Technological progress slows, and many countries remain in a state of economic depression." }
        ]
    },
    {
        title: "Conflict Prevented",
        color: "#009688",
        scenario: [
            { year: 1914, text: "The Sarajevo assassination causes tension, but the crisis is averted through mediation by the USA and Switzerland. Diplomatic negotiations lead to the creation of the League of Nations earlier than in real history." },
            { year: 1940, text: "Without a world war, colonial powers begin a peaceful process of decolonization. Nations spared from destruction focus on science, medicine, and transportation." },
            { year: 1990, text: "The world develops without major conflicts, and the space age begins earlier. The first colony on the Moon appears by the end of the century, and international cooperation becomes the norm." }
        ]
    }
],
"1969-Moon Landing": [
    {
        title: "Accelerated Space Race",
        color: "#80cbc4",
        scenario: [
            { year: 1969, text: "Humanity sets foot on the Moon for the first time. The USA asserts its leadership in the space race, inspiring other countries to strengthen their space programs." },
            { year: 1999, text: "A lunar base becomes a reality. The USA and the USSR collaborate to build a permanent station, marking the beginning of international space colonization." },
            { year: 2069, text: "The first mission to Mars is successfully completed. International efforts to explore deep space unite humanity, creating a unified space economy." }
        ]
    },
    {
        title: "Abandoning Space Exploration",
        color: "#4db6ac",
        scenario: [
            { year: 1969, text: "The Moon landing is successful, but the high cost of missions leads to reduced funding. The USA and the USSR decide to focus on solving Earth's problems." },
            { year: 1999, text: "Space exploration is limited to satellite technologies and the study of nearby planets. The dream of space colonization is postponed indefinitely." },
            { year: 2069, text: "Lunar missions remain a historical achievement, but humanity does not return to the Moon. Space remains largely unexplored, with research focused on Earth." }
        ]
    },
    {
        title: "Early Space Civilization",
        color: "#009688",
        scenario: [
            { year: 1969, text: "After a successful Moon landing, the USA announces plans for a permanent lunar presence. The USSR actively develops its own lunar program, intensifying competition." },
            { year: 1999, text: "Cooperation between the USA, Russia, Europe, and China leads to the creation of the first inhabited stations on the Moon. Lunar resources begin to be used for energy and fuel production." },
            { year: 2069, text: "Humanity establishes the first autonomous cities on the Moon. Lunar technologies enable breakthroughs in interplanetary travel, opening the way for exploring the Solar System." }
        ]
    }
],
"1991-Creation of the World Wide Web": [
    {
        title: "Rapid Internet Development",
        color: "#80cbc4",
        scenario: [
            { year: 1991, text: "Tim Berners-Lee launches the World Wide Web. Scientists and universities are the first to use the network for data exchange." },
            { year: 2021, text: "The internet becomes key infrastructure for the economy, culture, and education. Artificial intelligence, automation, and cloud technologies accelerate human progress." },
            { year: 2091, text: "The internet evolves into a global neural network, connecting people and machines. Physical borders disappear, creating a unified virtual space for interaction and creativity." }
        ]
    },
    {
        title: "Slowed Growth",
        color: "#4db6ac",
        scenario: [
            { year: 1991, text: "The World Wide Web is launched, but economic and political obstacles slow its development. The internet remains a niche technology for scientists and large corporations." },
            { year: 2021, text: "The internet is limited. Only large organizations have access to the network, while mass communication occurs through traditional media. Technological progress slows." },
            { year: 2091, text: "The world remains divided as the internet fails to become a universal communication tool. Local innovations emerge, but without global knowledge exchange, their potential is limited." }
        ]
    },
    {
        title: "Alternative Digital World",
        color: "#009688",
        scenario: [
            { year: 1991, text: "The World Wide Web is not created. Instead, satellite communication with closed local networks for regions and countries becomes the dominant technology." },
            { year: 2021, text: "Each country develops its own network technologies, limiting international cooperation. Cyber competition becomes part of geopolitics." },
            { year: 2091, text: "Digital technologies develop unevenly. Virtual worlds exist only within individual states, and a global knowledge network never emerges. However, local digital projects lead to unique cultural and technological ecosystems." }
        ]
    }
],
"2002-Foundation of SpaceX": [
    {
        title: "Successful Space Leadership",
        color: "#80cbc4",
        scenario: [
            { year: 2002, text: "Elon Musk founds SpaceX to make space flights cheaper and enable Mars exploration. In its early years, the company focuses on developing launch vehicles." },
            { year: 2052, text: "SpaceX becomes the leading space company, managing lunar bases and delivering equipment for international Mars missions. Commercial flights to the Moon become a reality for wealthy clients." },
            { year: 2102, text: "Thanks to SpaceX's efforts and partnerships with other companies and governments, the first fully autonomous colony is built on Mars. Space infrastructure spans the entire Solar System." }
        ]
    },
    {
        title: "Limited Success",
        color: "#4db6ac",
        scenario: [
            { year: 2002, text: "SpaceX begins operations, but economic and technological challenges lead to a series of setbacks. Government space agencies maintain dominance in the field." },
            { year: 2052, text: "Private companies play only a supportive role in space, handling satellite and scientific equipment deliveries. Mars colonization remains a distant prospect, with research focused on the Moon." },
            { year: 2102, text: "SpaceX is limited to working with low-orbit satellites. Space exploration progresses slowly, focusing on automated stations and probes." }
        ]
    },
    {
        title: "Space Competition",
        color: "#009688",
        scenario: [
            { year: 2002, text: "SpaceX lays the foundation for private space flights, inspiring other companies and countries to develop their own space programs. Competition in the space industry grows." },
            { year: 2052, text: "Numerous private companies emerge globally, competing for space leadership. The USA, China, India, and the EU jointly develop international Mars stations, but each country strives for technological superiority." },
            { year: 2102, text: "The world enters an era of 'space capitalism,' where large corporations control resource extraction on asteroids and the Moon. Space becomes a new economic frontier, but environmental and political control issues remain unresolved." }
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
    scenarioText.textContent = "";
    const fullText = `${currentScenario[index].year} год:\n${currentScenario[index].text}`;
    let charIndex = 0;

    // Очищаем предыдущий интервал, если он существует
    if (currentInterval) {
        clearInterval(currentInterval);
    }

    // Запускаем новый интервал
    currentInterval = setInterval(() => {
        scenarioText.textContent += fullText.charAt(charIndex);
        charIndex++;
        if (charIndex >= fullText.length) {
            clearInterval(currentInterval); // Останавливаем интервал, когда текст завершён
        }
    }, 15);
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
