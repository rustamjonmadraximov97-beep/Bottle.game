const players = JSON.parse(localStorage.getItem("players")) || [];

const playerInput = document.getElementById("playerName");
const addBtn = document.getElementById("addPlayer");
const list = document.getElementById("playerList");
const bottle = document.getElementById("bottle");
const spinBtn = document.getElementById("spin");
const result = document.getElementById("result");

function savePlayers() {
    localStorage.setItem("players", JSON.stringify(players));
}

function renderPlayers() {
    list.innerHTML = "";

    players.forEach((player, index) => {
        const li = document.createElement("li");

        li.innerHTML = 
            ${player}
            <button onclick="removePlayer(${index})">❌</button>
        ;

        list.appendChild(li);
    });

    savePlayers();
}

window.removePlayer = function(index) {
    players.splice(index, 1);
    renderPlayers();
}

addBtn.onclick = () => {

    const name = playerInput.value.trim();

    if (!name) return;

    players.push(name);

    playerInput.value = "";

    renderPlayers();

}

spinBtn.onclick = () => {

    if (players.length < 2) {
        alert("Kamida 2 ta o'yinchi kiriting.");
        return;
    }

    spinBtn.disabled = true;

    const randomRotation =
        3600 + Math.floor(Math.random() * 3600);

    bottle.style.transform =
        rotate(${randomRotation}deg);

    const winner =
        players[Math.floor(Math.random() * players.length)];

    setTimeout(() => {

        result.innerHTML =
            🎯 ${winner};

        if (navigator.vibrate)
            navigator.vibrate(300);

        spinBtn.disabled = false;

    }, 4000);

}

renderPlayers();

if (window.Telegram && Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
}
