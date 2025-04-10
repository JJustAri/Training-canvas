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

// const nuageCount = window.innerWidth / 10;
let nuage = new Image();
nuage.src = '/assets/image/nuage.png';

let nuageVitesse = 1;
let x = 0;
let y =  [50, 75, 100, 125, 140];
let nuageSize = [100,125,150,175];
let ramdomSize = nuageSize[Math.floor(Math.random()*nuageSize.length)];
let ramdomY = y[Math.floor(Math.random()*y.length)];

  function draw() {
    
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

    ctx.drawImage(nuage, x, ramdomY, ramdomSize, ramdomSize); // Modifier les valeurs pour ajuster la taille et la position

    // Faire bouger les nuages
    x += nuageVitesse;

    // Si les nuages dépassent la largeur du canvas, les ramener à gauche
    if (x > canvas.width) {
        x = -ramdomSize;
        ramdomY = y[Math.floor(Math.random() * y.length)];
        ramdomSize = nuageSize[Math.floor(Math.random() * nuageSize.length)];
    }

    ctx.beginPath();
    ctx.arc(100, 100, 50, 0, Math.PI * 2);
    ctx.fillStyle = "yellow"
    ctx.strokeStyle = 'white';
    ctx.fill();
    ctx.closePath();
    // Redessiner à chaque frame
    requestAnimationFrame(draw);
}

// Lancer l'animation lorsque l'image est chargée
nuage.onload = function() {
    draw();
};


}