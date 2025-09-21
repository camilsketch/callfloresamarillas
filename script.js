const music = document.getElementById("music");
const btn = document.getElementById("fireworksBtn");
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// CREAR ESTRELLAS CON DESTELLOS ✦
const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.5,
    alpha: Math.random() * 0.8 + 0.5,
    dx: (Math.random() - 0.5) * 0.2,
    dy: (Math.random() - 0.5) * 0.2
  });
}

function drawStar(x, y, radius, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;

  // núcleo brillante
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // destellos ✦
  ctx.strokeStyle = "white";
  ctx.lineWidth = 0.3;
  ctx.beginPath();
  ctx.moveTo(x - radius * 3, y);
  ctx.lineTo(x + radius * 3, y);
  ctx.moveTo(x, y - radius * 3);
  ctx.lineTo(x, y + radius * 3);
  ctx.stroke();

  ctx.restore();
}

function drawGalaxy() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // movimiento de estrellas
  stars.forEach(star => {
    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0) star.x = canvas.width;
    if (star.x > canvas.width) star.x = 0;
    if (star.y < 0) star.y = canvas.height;
    if (star.y > canvas.height) star.y = 0;

    drawStar(star.x, star.y, star.radius, star.alpha);
  });
}

// 🌠 ESTRELLAS FUGACES
class ShootingStar {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height * 0.4; // parte superior
    this.length = 120 + Math.random() * 80;
    this.speed = 6 + Math.random() * 4;
    this.angle = Math.PI / 4; // diagonal ↘
    this.alpha = 1;

    const colors = ["#FFD700", "#8B0000"]; // dorado y vino
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }

  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= 0.01; // desvanecer
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    );
    ctx.stroke();
    ctx.restore();
  }
}

let shootingStars = [];

// ANIMACIÓN
function animate() {
  drawGalaxy();

  shootingStars.forEach((s, i) => {
    s.update();
    s.draw();
    if (s.alpha <= 0) shootingStars.splice(i, 1);
  });

  requestAnimationFrame(animate);
}
animate();

// CREAR ESTRELLA FUGAZ
function launchShootingStar() {
  shootingStars.push(new ShootingStar());
}

// BOTÓN: música + estrellas fugaces
btn.addEventListener("click", () => {
  music.play();
  launchShootingStar();
  setInterval(launchShootingStar, 4000); // cada 4s
});

// CORAZONES CAYENDO
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  const colors = ["#ffb6c1", "#add8e6"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.backgroundColor = color;
  heart.style.boxShadow = `0 0 10px ${color}`;

  const messageRect = document.querySelector(".message").getBoundingClientRect();
  heart.style.left = messageRect.left + Math.random() * messageRect.width + "px";
  heart.style.top = "-30px";
  heart.style.animation = `fall ${Math.random() * 3 + 5}s linear forwards`;

  document.getElementById("hearts-container").appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 500);