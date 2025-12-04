const logBox = document.getElementById("log");
const playBtn = document.getElementById("play");
const work = document.querySelector(".work");
const table = document.getElementById("tableWrap");
table.style.display = "none";
const closeBtn = document.getElementById("close");
const startBtn = document.getElementById("start");
const reloadBtn = document.getElementById("reload");
reload.style.display = "none";
const circle = document.getElementById("circle");
const anim = document.querySelector(".anim");
let step = 1;      
let dir = 0;    
let interval = null;
let counter = 1;
let visited = [false, false, false, false]; 
let eventCounter = 0;
let localStorageKey="localEvent";
let batchedEvents = []; 

function centerCircle() {
    const centerX = (anim.clientWidth - circle.offsetWidth) / 2;
    const centerY = (anim.clientHeight - circle.offsetHeight) / 2;
    circle.style.left = centerX + "px";
    circle.style.top = centerY + "px";
}
window.addEventListener("load", centerCircle);
function logEvent(message) {
    const now = new Date();
    const timeOnly = now.toLocaleTimeString('uk-UA', { hour12: false });
    eventCounter++;
    const eventData = {
        id: eventCounter,
        time: timeOnly, 
        message: message,
        step: step
    };
    sendToServer('immediate', eventData);
    batchedEvents.push(eventData); 
    localStorage.setItem(localStorageKey, JSON.stringify(batchedEvents));
    logBox.textContent = message;
}
async function sendToServer(type, data = null) {
    let serverUrl;
    let payload;
    if (type === 'immediate') {
        serverUrl = 'save_event.php'; 
        payload = JSON.stringify(data);
    } else if (type === 'final' && data) {
        serverUrl = 'save_batch.php'; 
        payload = JSON.stringify(data);
    } else {
        return;
    }
    try {
        const response = await fetch(serverUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload
        });
        return await response.json();
    } catch (error) {
        console.error(`Error sending data to ${serverUrl}:`, error);
    }
}
playBtn.onclick = () => {
    work.style.display = "flex";
    table.style.display = "none";
    logEvent("play pressed");
    centerCircle();
    const cacheBuster = Date.now();
    fetch(`clear_logs.php?_=${cacheBuster}`, { method: 'GET' })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                console.log("Логи успішно очищені");
            } else {
                console.error("Помилка очищення логів", data.details);
            }
        })
        .catch(error => console.error("Помилка при виклику clear_logs.php:", error));
};
closeBtn.onclick = async () => {
    logEvent("close pressed");
    await sendToServer('final', batchedEvents);
    fetch("get_events.php")
        .then(r => r.json())
        .then(data => {
            localStorage.setItem("eventsLocal", JSON.stringify(data.batch));
            localStorage.setItem("eventsServer", JSON.stringify(data.immediate));
            showTable();
            work.style.display = "none";
            table.style.display = "flex";
        });
        eventCounter =0;
};
function showTable() {
    const t = document.getElementById("tableWrap");
    t.style.display = "block";
    const local = JSON.parse(localStorage.getItem("eventsLocal") || "[]");
    const server = JSON.parse(localStorage.getItem("eventsServer") || "[]");
    document.getElementById("localCol").innerHTML =
        local.map(e => formatEvent(e)).join("<br>");
    document.getElementById("serverCol").innerHTML =
        server.map(e => formatEvent(e)).join("<br>");
}
function formatEvent(e) {
    return `${e.id}) час: ${e.time_local || e.time} ${e.message}`;
}
function move() {
    let x = circle.offsetLeft;
    let y = circle.offsetTop;
    if (dir === 0) x -= step;
    else if (dir === 1) y -= step;
    else if (dir === 2) x += step;
    else if (dir === 3) y += step;
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    logEvent("step " + step);
    step++;
    dir=(dir+1)%4;
    checkQuadrant(x, y);
    const maxX = anim.clientWidth - circle.offsetWidth;
    const maxY = anim.clientHeight - circle.offsetHeight;
    if (x < 0 || y < 0 || x > maxX || y > maxY) {
        clearInterval(interval);
        logEvent("animation stopped (out of bounds)");
        startBtn.style.display = "none";
        reloadBtn.style.display = "block";
    }
}
startBtn.onclick = () => {
    logEvent("start");
    startBtn.disabled = true;
    interval = setInterval(move, 4); 
};
function checkQuadrant(x, y) {
    const midX = anim.clientWidth / 2;
    const midY = anim.clientHeight / 2;
    let q = -1;
    if (x < midX && y < midY) q = 0;
    else if (x > midX && y < midY) q = 1;
    else if (x < midX && y > midY) q = 2;
    else if (x > midX && y > midY) q = 3;
    if(q>=0){
        logEvent("quadrant " + (q + 1));
    }
}
reloadBtn.onclick = () => {
    logEvent("reload");
    visited = [false, false, false, false];
    step = 1;
    dir = 0;
    circle.style.left = anim.clientWidth / 2 - 10 + "px";
    circle.style.top = anim.clientHeight / 2 - 10 + "px";
    startBtn.disabled = false;
    startBtn.style.display = "block";
    reloadBtn.style.display = "none";
};


