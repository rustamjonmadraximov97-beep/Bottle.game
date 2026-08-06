// Telegram WebApp integratsiyasi
const tg = window.Telegram.WebApp;
tg.expand();

if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    document.getElementById('username').innerText = tg.initDataUnsafe.user.first_name;
}

const bottle = document.getElementById('bottle');
const spinBtn = document.getElementById('spin-btn');
const mainSpin = document.getElementById('main-spin');

let currentRotation = 0;
let isSpinning = false;

function spinBottle() {
    if (isSpinning) return;
    isSpinning = true;

    // Tasodifiy aylanish darajasi (360 * 5 to'liq aylanish + random burchak)
    const randomDegree = Math.floor(Math.random() * 360) + 1800;
    currentRotation += randomDegree;

    bottle.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        // O'yin mantiqi: qaysi o'rindiqqa to'g'ri kelganini aniqlash shu yerda yoziladi
    }, 3000);
}

spinBtn.addEventListener('click', spinBottle);
mainSpin.addEventListener('click', spinBottle);

// Modal oyna boshqaruvi
const giftModal = document.getElementById('gift-modal');
const giftOpen = document.getElementById('gift-modal-open');
const giftClose = document.getElementById('gift-close');

giftOpen.addEventListener('click', () => {
    giftModal.style.display = 'flex';
});

giftClose.addEventListener('click', () => {
    giftModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === giftModal) {
        giftModal.style.display = 'none';
    }
});
// --- YANI QO'SHILGAN QISM ---
const spinSound = new Audio('https://www.myinstants.com/media/sounds/wheel-spin.mp3');

function playSpinSound() {
    spinSound.currentTime = 0;
    spinSound.play().catch(e => console.log("Audio block: ", e));
}
// ----------------------------

// Telegram WebApp integratsiyasi
const tg = window.Telegram.WebApp;
tg.expand();

// ... (oldingi kodlaringiz shu yerda qoladi)

function spinBottle() {
    if (isSpinning) return;
    
    playSpinSound(); // <--- Ovozni shu yerda chaqiramiz
    
    isSpinning = true;

    // Tasodifiy aylanish darajasi
    const randomDegree = Math.floor(Math.random() * 360) + 1800;
    currentRotation += randomDegree;

    bottle.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
    }, 3000);
}

// ... (qolgan kodlaringiz)
