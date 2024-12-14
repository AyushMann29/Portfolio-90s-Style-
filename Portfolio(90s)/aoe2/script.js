const player = document.getElementById("player");
const tc = document.getElementById("tc");
const castle = document.getElementById("castle");
const university = document.getElementById("university");
const about1 = document.getElementById("about1");
const about2 = document.getElementById("about2");
const about3 = document.getElementById("about3");
const about4 = document.getElementById("about4");

function changeToHome(){
  window.location.href = "../index.html";
}

let tclocation = { x: 340, y: 570 };
let castlelocation = { x: 1200, y: 100 };
let universitylocation = { x: 500, y: 200 };
tc.style.left = `${tclocation.x}px`;
tc.style.top = `${tclocation.y-10}px`;
castle.style.left = `${castlelocation.x}px`;
castle.style.top = `${castlelocation.y-50}px`;
university.style.left = `${universitylocation.x}px`;
university.style.top = `${universitylocation.y-20}px`;

let playerLocation = { x: 1040, y: 850 }; // Initial position
player.style.left = `${playerLocation.x}px`;
player.style.top = `${playerLocation.y}px`;

const playerSprites = {
  right: ["../assets/right1.png", "../assets/right2.png"],
  left: ["../assets/left1.png", "../assets/left2.png"],
  up: ["../assets/up1.png", "../assets/up2.png"],
  down: ["../assets/down1.png", "../assets/down2.png"],
};

let currentDirection = "down"; // Initial direction
let frameIndex = 0; // Current animation frame index
let isMoving = false;
let mouseX = playerLocation.x;
let mouseY = playerLocation.y;
let moveInterval;

function updateSprite() {
  if (!isMoving) return;
  const frames = playerSprites[currentDirection];
  frameIndex = (frameIndex + 1) % frames.length;
  player.src = frames[frameIndex];
}

function movePlayer() {
  const dx = mouseX - playerLocation.x;
  const dy = mouseY - playerLocation.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const speed = 3.5;

  if (distance > speed) {
    if (Math.abs(dx) > Math.abs(dy)) {
      playerLocation.x += dx > 0 ? speed : -speed;
      currentDirection = dx > 0 ? "right" : "left";
    } else {
      playerLocation.y += dy > 0 ? speed : -speed;
      currentDirection = dy > 0 ? "down" : "up";
    }
    player.style.left = `${playerLocation.x}px`;
    player.style.top = `${playerLocation.y}px`;
    isMoving = true;
    handleCollision();
  } else {
    playerLocation.x = mouseX;
    playerLocation.y = mouseY;
    player.style.left = `${playerLocation.x}px`;
    player.style.top = `${playerLocation.y}px`;
    isMoving = false;
    handleCollision();
  }
}

document.addEventListener("click", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (!moveInterval) {
    moveInterval = setInterval(movePlayer, 20);
  }
  isMoving = true;
});

setInterval(updateSprite, 250);

function checkCollision(obj1, obj2) {
    const rect1 = obj1.getBoundingClientRect();
    const rect2 = obj2.getBoundingClientRect();

    const hitboxSize = 400; // Increase this value to make the hitbox larger
    const rect2Adjusted = {
        top: rect2.top - (hitboxSize - rect2.height) / 2,
        bottom: rect2.bottom + (hitboxSize - rect2.height) / 2,
        left: rect2.left - (hitboxSize - rect2.width) / 2,
        right: rect2.right + (hitboxSize - rect2.width) / 2,
    };

    return !(
        rect1.top > rect2Adjusted.bottom ||
        rect1.bottom < rect2Adjusted.top ||
        rect1.left > rect2Adjusted.right ||
        rect1.right < rect2Adjusted.left
    );
}

function handleCollision() {
  if (checkCollision(player, tc)) {
    console.log("Collision with TC!");

    about1.innerHTML = "Contacts: mannayush60@gmail.com ";
    about2.innerHTML = `LinkedIn: www.linkedin.com/in/ayush-mann29/`
    about3.innerHTML = `Github: www.github.com/ayushmann29`
    about4.innerHTML = `Instagram: www.instagram.com/reproducibletie1/`
  }
  if (checkCollision(player, castle)) {
    about1.innerHTML = "Programming: JavaScript, TypeScript, Python, Java, C++.";
    about2.innerHTML = `Web Development: React, Three.js, Node.js, CSS, HTML.`
    about3.innerHTML = `Cloud Platforms: GCP, AWS.`
    about4.innerHTML = `Tools: Git, Docker, CI/CD, APIS.`
  }
  if (checkCollision(player, university)) {
    about1.innerHTML = "B.Tech in Computer Science and Engineering from VIT Bhopal University. 2023-2027.";
    about2.innerHTML = `XII from GMSSSS, Hisar. 2021-2023. Percentage: 88.8%`
    about3.innerHTML = `X from VBPS, Noida. 2019-2021. Percentage: 87.4.`
    about4.innerHTML = `.`
  }
}

if (!moveInterval) {
  moveInterval = setInterval(movePlayer, 20);
}
