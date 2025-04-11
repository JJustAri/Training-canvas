// Récupération du canvas et son context
const canvas = document.getElementById('canvasLight');
ctx = canvas.getContext('2d');

// Initialisation des variables hauteur et largeur
if(ctx) {
let height;
let width;

// on ajoute un écouteur d'évènement sur le redimenssionnement 
window.addEventListener('resize', resize);

// fonction pour changer la taille du canvas lorsque l'écran est redimensionné
function resize() {

    height = window.innerHeight;
    width = window.innerWidth;

    const scale = window.devicePixelRatio || 1;

    canvas.width = width * scale;
    canvas.height = height * scale;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(scale, scale);
}

// on lance la fonction a chaque rechargement de page
resize();

const nuageCount = Math.floor(window.innerWidth / 120);
console.log(nuageCount)
console.log(width)
let nuages = [];


let nuage = new Image();
nuage.src = '/assets/image/nuage.png';

let nuageVitesse = 0.5;
let x = 0;
let y =  [50, 75, 100, 125, 140];
let nuageSize = [100,125,150,175];
let ramdomSize = nuageSize[Math.floor(Math.random()*nuageSize.length)];
let ramdomY = y[Math.floor(Math.random()*y.length)];
let blurDirection = 0.1;

for (i = 0; i < nuageCount; i++) {
    nuages.push({
        x : 0,
        y : ramdomY,
        vitesse : Math.random() < 0.5 ? 0.5 : -0.5,
    })
}

  function draw() {
    
    drawBackGround();
    drawSun();

    ctx.drawImage(nuage, x, ramdomY, ramdomSize, ramdomSize); // 

    // Faire bouger les nuages
    x += nuageVitesse;

    // Si les nuages dépassent la largeur du canvas, les ramener à gauche
    if (x > canvas.width && nuageVitesse > 0) {
        x = -150;
        ramdomY = y[Math.floor(Math.random() * y.length)];
        ramdomSize = nuageSize[Math.floor(Math.random() * nuageSize.length)];
    }

    


    // Redessiner à chaque frame (le nuage sera dessiné avec une position différente pour donner une impression d'avancer)
    requestAnimationFrame(draw);
}

// Background gradient pour imiter le ciel
function drawBackGround () {
let linearGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    linearGradient.addColorStop(0.1, 'rgba(58, 113, 231, 0.6)');
    linearGradient.addColorStop(0.5, 'rgba(177, 222, 247, 1)');
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Effet radial lumineux
    let radialGradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);
    radialGradient.addColorStop(0, 'rgba(41, 196, 255, 0.2)');
    radialGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = radialGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

}

// Soleil

let blur = 0; // on déclare une variable blur pour gerer l'animation

function drawSun() {

if (blur < 15) { //si le blur est en dessous de 15 on met la direction en positive
    blurDirection = 0.05;
}

if(blur > 45) {
        blurDirection = -0.05; // pareil mais négatif, cela va servir a alterner le gain et la perte de blur
}

blur += blurDirection; // on ajoute a blur 0.05 ou -0.05 a chaque frame 
ctx.beginPath();
ctx.arc(100, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = "rgb(255, 253, 128)";
ctx.strokeStyle = 'rgb(255, 254, 171)';
ctx.shadowColor = 'rgb(255, 254, 171)';
ctx.shadowBlur = blur; // on défini a le shadowblur avec la valeur de blur qui se met a jour a chaque frame

ctx.fill();
ctx.closePath();

ctx.shadowBlur = 0; // on reinitialise le shadowblur pour eviter qu'il aille sur d'autre éléments
    ctx.shadowColor = "transparent";

}
// Lancer l'animation lorsque l'image est chargée
nuage.onload = function() {
    draw();
};


}