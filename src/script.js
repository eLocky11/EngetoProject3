// consts
const locale = "en-US";
const dateFormatter = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "2-digit" });
const timeFormatter = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

const userDatetimeEl = document.getElementById("user-datetime");
const dailyImgSection = document.getElementById("daily-insert");
const stormInfoSection = document.getElementById("storm-insert");
const toTopBtn = document.getElementById("toTop");

const apiKey = "5RqBZjQI4rrfEXoNIwpbEKdYF57IVQkyzBGX1d2h";
const apiAPOD = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
const apiDONKI = `https://api.nasa.gov/DONKI/GST?api_key=${apiKey}`;

// user date and time viewer
function updateUserDateTime() {
    const now = new Date();
    userDatetimeEl.textContent = `${dateFormatter.format(now)}, ${timeFormatter.format(now)}`;
}

// burger dropdown logic
document.getElementById("burger").addEventListener("click", () => {
    document.getElementById("nav-menu").classList.toggle("show");
});

// theme changer method
function initThemeToggle() {
    const button = document.getElementById("changeTheme");
    const body = document.body;
    const icon = button.querySelector("i")

    button.addEventListener("click", () => {
        body.classList.toggle("day");
        body.classList.toggle("night");
        console.log("Theme toggled:", body.className);

        if (body.classList.contains("night")) {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
        } else {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    });
}

// to top button
function handleScroll() {
    if (window.scrollY > 200) {
        toTopBtn.classList.add("show");
        toTopBtn.classList.remove("hide");
    } else {
        toTopBtn.classList.add("hide");
        toTopBtn.classList.remove("show");
    }
}

// smooth scrolling
toTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// password validator
const form = document.getElementById("login-form");
form.addEventListener("submit", e => {
    const p1 = document.getElementById("pass1").value;
    const p2 = document.getElementById("pass2").value;
    const err = document.getElementById("pass-error");

    if (p1 !== p2) {
        e.preventDefault();
        err.textContent = "Passwords do not match!";
    } else {
        e.preventDefault()
        err.textContent = "Passwords match!";
    }
});


// fetching data from ulr
async function fetchJson(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error(`Fetch error (${url}):`, e);
        return null;
    }
}

// date formate for daily images
function formatDate(dt) {
    return dt.toISOString().split("T")[0];
}

// date randomizer
function getRandomDate() {
    const start = new Date(1995, 5, 16);
    const end = new Date();
    end.setDate(end.getDate() - 2);
    const diff = end.getTime() - start.getTime();
    const rnd = new Date(start.getTime() + Math.random() * diff);
    return formatDate(rnd);
}

// fetch APOD data with dates
function fetchApodByDate(date) {
    const url = `${apiAPOD}&date=${date}`;
    return fetchJson(url);
}

// daily image rendering method
function renderDailyImages(list) {
    dailyImgSection.textContent = "";

    list.forEach(item => {
        const { data, label } = item;
        const wrapper = document.createElement("div");
        wrapper.className = "daily-image";

        // use HDURL if it is or url
        const fullImg = data.hdurl || data.url;

        const mediaHTML = data.media_type === "video"
            ? `
                <div class="daily-image-media">
                <iframe
                    src="${data.url}"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
                </div>`
            : `
                <div class="daily-image-media">
                <a href="${fullImg}" target="_blank" rel="noopener">
                    <img src="${data.url}" alt="${data.title}" />
                </a>
                </div>`;

        wrapper.innerHTML = `
            <h3>${label}: ${data.title}</h3>
            ${mediaHTML}
            <div class="daily-image-desc">
            <p>${data.explanation}</p>
            </div>
        `;
        dailyImgSection.append(wrapper);
    });
}


// storms rendering method
function renderStormEvents(data) {
    stormInfoSection.textContent = "";
    if (!data?.length) {
        stormInfoSection.textContent = "No geomagnetic storms";
        return;
    }

    const frag = document.createDocumentFragment();
    data.forEach(evt => {
        const card = document.createElement("div");
        card.className = "storm-event";
        card.innerHTML = `
            <h3>Storm: ${evt.gstID}</h3>
            <p><strong>Beginning:</strong> ${new Date(evt.startTime).toLocaleString()}</p>
            <p>
            <a href="https://en.wikipedia.org/wiki/K-index" target="_blank"><strong><i>K</i><sub>p</sub>-index</strong></a>: ${evt.allKpIndex.map(i => i.kpIndex).join(", ")}
            </p>
        `;
        frag.append(card);
    });
    stormInfoSection.append(frag);
}

// initialize
async function init() {
    updateUserDateTime();
    setInterval(updateUserDateTime, 1000);
    initThemeToggle();

    // loaders
    dailyImgSection.textContent = "Loading daily images...";
    stormInfoSection.textContent = "Loading geomagnetic storms info...";

    // gen three dates
    const today = formatDate(new Date());
    const yesterday = formatDate(new Date(Date.now() - 86400000));
    let randomDate;
    do {
        randomDate = getRandomDate();
    } while (randomDate === today || randomDate === yesterday);

    const [
        todayData,
        yesterdayData,
        randomData,
        stormData
    ] = await Promise.all([
        fetchApodByDate(today),
        fetchApodByDate(yesterday),
        fetchApodByDate(randomDate),
        fetchJson(apiDONKI)
    ]);

    // all render
    renderDailyImages([
        { label: "Today", data: todayData },
        { label: "Yesterday", data: yesterdayData },
        { label: "Random Day", data: randomData },
    ]);
    renderStormEvents(stormData);
}


window.addEventListener("scroll", handleScroll);
init();